# Fact_Course_History

## Purpose
This historical fact table maintains yearly snapshots of course progress and completion status. It enables point-in-time analysis of learning progress, tracking how course completion states change over fiscal years, and supports longitudinal studies of learning patterns.

## Key Features
- Creates yearly snapshots of course progress
- Preserves status transitions across fiscal years
- Maintains relationships with programs and certifications
- Enables historical trend analysis
- Supports compliance history tracking
- Records learning path progression over time

## Source Tables and Mappings

### Fact_Course_Progress (Primary Source)
    Cert_ID --> Cert_ID                    # Associated certification
    Course_ID --> Course_ID                # Course identifier
    Course_User_ID --> Course_User_ID      # Unique course-user combination
    Date_Began --> Date_Began              # Course start date
    Date_Completed --> Date_Completed      # Course completion date
    Program_ID --> Program_ID              # Associated program
    Program_User_ID --> Program_User_ID    # Program-user combination
    User_ID --> User_ID                    # Learner identifier
    SCORM_ID --> SCORM_ID                  # Associated e-learning content

### Dim_FY_Completed (Completion Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for completion
    Date_Completed --> FYEndDate           # Fiscal year end for completion

### Dim_FY_Began (Start Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for enrollment
    Date_Began --> FYEndDate               # Fiscal year end for enrollment

### Dim_Course_Progress (Progress Details)
    Course_User_ID --> Course_User_ID      # Course-user combination reference
    Time_started --> Time started          # When the course was started
    Completion_Status --> Completion Status # Status at point in time

## Status Transitions Example
```
FY19: Status = 'In Progress'
FY20: Status = 'In Progress'
FY21: Status = 'Completed'
```

## Common Queries
- Year-over-year completion trends
- Historical status analysis
- Learning path progression patterns
- Time to completion trends
- Program completion patterns
- Certification achievement tracking
- Cohort analysis across years

## Related Tables
- Fact_Course_Progress: For current state
- Fact_Program_History: For program context
- Fact_Certification_History: For certification context
- Dim_Course: For course details
- Dim_User: For learner information

## Notes
- Snapshots are created at fiscal year boundaries
- Maintains full status history for compliance
- Enables historical reporting and analysis
- Supports audit requirements
- Tracks both individual courses and program components
- Preserves relationships with certifications and programs