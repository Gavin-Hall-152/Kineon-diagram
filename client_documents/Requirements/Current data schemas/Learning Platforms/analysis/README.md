# Table Relationship Analysis

This folder contains relationship mappings for the Learning Platforms data warehouse tables. Each file documents the relationships between tables and their source data.

## Folder Structure

The analysis is organized into three main categories:

```
/analysis
├── Dim/                 # Dimension table mappings
├── Fact/                # Main fact table mappings
├── Fact_History/        # Historical snapshot fact table mappings
├── README.md           # This file
└── SUMMARY.md          # Overall data warehouse structure summary
```

## File Categories

### Dimension Tables (/Dim)
Contains mappings for 17 dimension tables that provide descriptive attributes and lookups:
- User and organizational dimensions
- Course/Program/Certification definitions
- Time-related dimensions
- Learning content details

### Fact Tables (/Fact)
Contains mappings for 7 main fact tables that track current state:
- Course/Certification/Program progress
- Learning time tracking
- Seminar attendance
- SCORM interactions

### Historical Fact Tables (/Fact_History)
Contains mappings for 4 historical snapshot tables that track changes over time:
- Course history
- Certification history
- Course-to-Certification relationship history
- Program history

## File Format
Each markdown file follows this structure:
```
TableName
    SourceTable1/File1
        TargetColumn --> SourceColumn
        TargetColumn --> SourceColumn
    SourceTable2/File2
        TargetColumn --> SourceColumn
```

Where:
- `TableName`: The fact or dimension table being documented
- `SourceTable1/File1`: The source table or CSV file providing the data
- `TargetColumn --> SourceColumn`: Shows how columns map between target and source
    - Left side: Column name in the target table
    - Right side: Column name in the source table/file

## Special Cases
- For static dimension tables (like Dim_FY_Began), source is listed as "Static Values"
- For tables with multiple data sources, all sources are listed with their respective column mappings
- Default/NULL handling records (usually ID = -1) are not shown in the mappings

For a comprehensive overview of the data warehouse structure and relationships, please refer to SUMMARY.md. 