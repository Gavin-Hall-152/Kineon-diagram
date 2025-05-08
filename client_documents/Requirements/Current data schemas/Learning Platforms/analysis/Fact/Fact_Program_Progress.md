# Fact_Program_Progress

## Purpose
This fact table tracks learner progress through structured learning programs, which may include multiple courses and certifications. It serves as the primary source for monitoring program completion, tracking deadlines, and analyzing learning pathways at the program level.

## Key Features
- Tracks overall program completion status
- Manages program assignment and completion dates
- Monitors due date compliance
- Links individual courses to program structure
- Supports fiscal year-based analysis
- Enables program effectiveness tracking

## Source Tables and Mappings

### analytics_prog_completions.csv (Program Completion Data)
    User_ID --> User ID                    # Learner identifier
    Program_ID --> Program ID              # Program identifier
    Program_User_Key --> Program_User_Key  # Unique program enrollment key

### Analytics_prog_overview.csv (Program Details)
    User_ID --> User ID                    # Learner identifier
    Program_User_Key --> Program_User_Key  # Program enrollment reference
    Due_Date --> Due Date                  # Program completion deadline

### Dim_Program_Progress (Progress Details)
    Program_ID --> Program ID              # Program reference
    User_ID --> User ID                    # Learner reference
    Program_User_ID --> Program_User_ID    # Program-user combination ID
    Time_assigned --> Time assigned        # Program assignment date
    Time_completed --> Time completed      # Program completion date

### Dim_FY_Completed (Completion Fiscal Year)
    Date_Completed --> FYStartDate         # Fiscal year start for completion
    Date_Completed --> FYEndDate           # Fiscal year end for completion

### Dim_FY_Began (Assignment Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for assignment
    Date_Began --> FYEndDate               # Fiscal year end for assignment

## Common Queries
- Program completion rates
- Time to completion analysis
- Due date compliance tracking
- Program enrollment trends
- Learning pathway effectiveness
- Fiscal year completion patterns
- Program success metrics

## Related Tables
- Fact_Course_Progress: For individual course tracking
- Fact_Program_History: For historical snapshots
- Fact_Course_to_Cert_Progress: For certification components
- Dim_Programs: For program details
- Dim_User: For learner information

## Notes
- Programs can contain multiple courses and certifications
- Tracks both mandatory and optional programs
- Supports complex learning pathways
- Enables program effectiveness analysis
- Maintains completion deadlines
- Links to individual course and certification progress

## Program States
- Not Started: Assigned but not begun
- In Progress: Started but not completed
- Completed: All requirements met
- Overdue: Past due date without completion
- Withdrawn: Removed from program 