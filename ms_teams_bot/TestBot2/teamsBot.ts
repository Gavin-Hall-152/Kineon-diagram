import {
  ActivityHandler,
  TurnContext,
} from "botbuilder";
import axios from "axios";

import * as path from 'path';
import * as dotenv from "dotenv";

if (!process.env.DATABRICKS_HOST) {
  dotenv.config({ path: path.resolve(__dirname, 'env/.env.local') });
}

const DATABRICKS_SPACE_ID = process.env.DATABRICKS_SPACE_ID!;
const DATABRICKS_HOST = process.env.DATABRICKS_HOST!;
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN!;

// This function sends the user's prompt to DataBricks Genie API and gets a response
async function askGenie(
  context: TurnContext,
  question: string,
  spaceId: string,
  conversationId?: string
): Promise<{ result: string; newConversationId: string }> {
  try {
    const genieBaseUrl = `${DATABRICKS_HOST}/api/2.0/genie`;

    const headers = {
      Authorization: `Bearer ${DATABRICKS_TOKEN}`,
      "Content-Type": "application/json",
    };

    context.sendActivity("processing...");

    let response;
    if (!conversationId) { // start a new conversation
      response = await axios.post(
        `${genieBaseUrl}/spaces/${spaceId}/start-conversation`,
        { content: question },
        { headers }
      );
    }
    else {
      response = await axios.post(
        `${genieBaseUrl}/spaces/${spaceId}/conversations/${conversationId}/messages`,
        { content: question },
        { headers }
      );
    }

    let message = response.data;
    const messageId = message.message_id;
    const newConversationId = message.conversation_id;
    
    // poll until ready
    response = await pollForCompletion(context, `${genieBaseUrl}/spaces/${spaceId}/conversations/${newConversationId}/messages/${messageId}`, headers);
    message = response.data;
    console.log("ready: " + JSON.stringify(message) + "\n");

    if (message.attachments) {
      if ('query' in message.attachments[0] === false) {
        return {
          result: JSON.stringify({
            query_description: message.attachments[0].text.content
          }),
          newConversationId,
        };
      }

      const attachmentId = message.attachments[0].attachment_id;
      const stmtResult = await axios.get(
        `${genieBaseUrl}/spaces/${spaceId}/conversations/${newConversationId}/messages/${messageId}/query-result/${attachmentId}`,
        { headers }
      );

      console.log("result: " + JSON.stringify(stmtResult.data) + "\n");

      return {
        result: JSON.stringify({
          columns: stmtResult.data.statement_response.manifest.schema,
          data: stmtResult.data.statement_response.result,
          sql: message.attachments?.[0]?.query?.query || "",
          query_description: message.attachments?.[0]?.query?.description || "",
        }),
        newConversationId,
      };
    }

    return {
      result: JSON.stringify({ error: 'No attachment error' }),
      newConversationId,
    };
  } catch (err) {
    console.error("Error in askGenie:", err);
    return {
      result: JSON.stringify({ error: "An error occurred while contacting Genie." }),
      newConversationId: conversationId || "",
    };
  }
}

// Process the response from DataBricks Genie and format it for display
function processQueryResults(answerJson: any): string {
  console.log("answerJSON: " + JSON.stringify(answerJson) + "\n");

  let response = "";
  if (answerJson.query_description) {
    response += `## Query Description\n\n${answerJson.query_description}\n\n`;
  }

  if (answerJson.sql) {
    response += `## SQL\n\n${answerJson.sql}\n\n`;
  }

  if (answerJson.columns && answerJson.data) {
    const columns = answerJson.columns.columns;
    const data = answerJson.data.data_array || [];

    const header = "| " + columns.map((col: any) => col.name).join(" | ") + " |";
    const separator = "|" + columns.map(() => "---").join("|") + "|";

    const rows = data.length === 0 ? "0 rows" : data
      .map((row: any[]) =>
        "| " +
        row
          .map((val, idx) => {
            const col = columns[idx];
            if (val === null) return "NULL";
            if (["DECIMAL", "DOUBLE", "FLOAT"].includes(col.type_name)) {
              return parseFloat(val).toFixed(2);
            }
            if (["INT", "BIGINT", "LONG"].includes(col.type_name)) {
              return parseInt(val).toString();
            }
            return val.toString();
          })
          .join(" | ") +
        " |"
      )
      .join("\n");

    response += "## Query Results\n\n" + header + "\n" + separator + "\n" + rows;
  } else if (answerJson.message) {
    response += answerJson.message;
  } else {
    response += "No data available.";
  }

  return response;
}

// Polls DataBricks Genie until result is ready (ie COMPLETED, FAILED or CANCELLED)
// Polls every 5 seconds and times out after 1 minute
async function pollForCompletion(context: TurnContext, url: string, headers: any): Promise<any> {
  const startTime = Date.now();
  const timeout = 60000; // 1 minute
  const interval = 5000; // 5 seconds

  while (Date.now() - startTime < timeout) {
    try {
      const response = await axios.get(url, { headers });
      const status = response.data.status;
      console.log("poll status: " + status);
      context.sendActivity("processing... status = " + status);

      if (status === 'COMPLETED') {
        return response; // Return the response if COMPLETED
      } else if (status === 'FAILED' || status === 'CANCELLED') {
        return null; // Return null if FAILED or CANCELLED
      }
    } catch (error) {
      console.error('Error polling for completion:', error);
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }

  return null; // Return null if timeout exceeded
}

export class TeamsBot extends ActivityHandler {
  private conversationMap = new Map<string, string>();

  constructor() {
    super();

    // On receive message from user
    this.onMessage(async (context: TurnContext) => {
      const question = context.activity.text;
      const userId = context.activity.from.id;
      const previousConvId = this.conversationMap.get(userId);

      const { result, newConversationId } = await askGenie(context, question, DATABRICKS_SPACE_ID, previousConvId);
      this.conversationMap.set(userId, newConversationId);

      let response: string;
      try {
        response = processQueryResults(JSON.parse(result));
      } catch (e) {
        console.error(e);
        response = "Failed to parse Genie response.";
      }
      
      await context.sendActivity(response);
    });

    this.onMembersAdded(async (context, next) => {
      const welcome = "Welcome to the Databricks Genie Bot!";
      for (const member of context.activity.membersAdded || []) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(welcome);
        }
      }
      await next();
    });
  }
}
