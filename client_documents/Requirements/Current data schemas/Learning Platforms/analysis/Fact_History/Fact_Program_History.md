# Fact_Program_History

## Purpose
This historical fact table maintains yearly snapshots of program progress and completion status. It enables point-in-time analysis of learning program effectiveness, tracking how program completion states change over fiscal years, and supports longitudinal analysis of learning pathways.

## Key Features
- Creates yearly program status snapshots
- Preserves program completion transitions
- Maintains relationships with courses and certifications
- Tracks program effectiveness over time
- Supports learning pathway analysis
- Enables historical trend reporting

## Source Tables and Mappings

### Fact_Program_Progress (Primary Source)
    Cert_ID --> Cert_ID                    # Associated certification
    Course_ID --> Course_ID                # Component course
    Course_User_ID --> Course_User_ID      # Course-user combination
    Date_Began --> Date_Began              # Program start date
    Date_Completed --> Date_Completed      # Program completion date
    Program_ID --> Program_ID              # Program identifier
    Program_User_ID --> Program_User_ID    # Program-user combination
    User_ID --> User_ID                    # Learner identifier

### Dim_FY_Completed (Completion Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for completion
    Date_Completed --> FYEndDate           # Fiscal year end for completion

### Dim_FY_Began (Start Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for program
    Date_Began --> FYEndDate               # Fiscal year end for program

## Status Transitions Example
```
FY19: Status = 'In Progress'
FY20: Status = 'In Progress'
FY21: Status = 'Completed'
```

## Common Queries
- Year-over-year program completion rates
- Program effectiveness trends
- Learning pathway patterns
- Time to completion analysis
- Component completion sequences
- Program success metrics over time
- Cohort progression analysis

## Related Tables
- Fact_Program_Progress: For current state
- Fact_Course_History: For course component history
- Fact_Certification_History: For certification context
- Dim_Programs: For program details
- Dim_User: For learner information

## Notes
- Snapshots are created at fiscal year boundaries
- Maintains complete program history
- Tracks both mandatory and optional programs
- Preserves learning pathway patterns
- Supports program effectiveness analysis
- Links to course and certification histories

## Program States
- Not Started: Program assigned but not begun
- In Progress: Some components completed
- Completed: All requirements satisfied
- Withdrawn: Removed from program
- Extended: Completion deadline extended
- Suspended: Temporarily paused

## Analysis Capabilities
- Program effectiveness measurement
- Learning pathway optimization
- Resource utilization tracking
- Component sequence analysis
- Completion pattern identification
- Success rate trending 