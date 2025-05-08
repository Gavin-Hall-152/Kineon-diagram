# Fact_Certification_History

## Purpose
This historical fact table maintains yearly snapshots of certification status and progress. It enables point-in-time analysis of certification achievements, tracking status transitions across fiscal years, and supports compliance history and audit requirements.

## Key Features
- Creates yearly certification status snapshots
- Preserves certification validity periods
- Maintains relationships with courses and programs
- Tracks certification status transitions
- Supports compliance history tracking
- Enables longitudinal certification analysis

## Source Tables and Mappings

### Fact_Certification_Progress (Primary Source)
    Cert_ID --> Cert_ID                    # Certification identifier
    Course_ID --> Course_ID                # Related course
    Course_User_ID --> Course_User_ID      # Course-user combination
    Date_Began --> Date_Began              # Certification start date
    Date_Completed --> Date_Completed      # Certification completion date
    Program_ID --> Program_ID              # Associated program
    Program_User_ID --> Program_User_ID    # Program-user combination
    Certification_User_ID --> Certification_User_ID  # Certification-user combination
    User_ID --> User_ID                    # Learner identifier

### Dim_FY_Completed (Completion Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for completion
    Date_Completed --> FYEndDate           # Fiscal year end for completion

### Dim_FY_Began (Start Fiscal Year)
    Date_Began --> FYStartDate             # Fiscal year start for certification
    Date_Began --> FYEndDate               # Fiscal year end for certification

### Dim_Certification_Progress (Status Details)
    Certification_User_ID --> Certification_User_ID  # Certification-user reference
    Status --> Status                      # Certification status at point in time

## Status Transitions Example
```
FY19: Status = 'Not certified'
FY20: Status = 'Not certified'
FY21: Status = 'Certified'
```

## Common Queries
- Year-over-year certification rates
- Certification status transitions
- Historical compliance analysis
- Time to certification trends
- Certification maintenance patterns
- Expiration tracking over time
- Certification pathway effectiveness

## Related Tables
- Fact_Certification_Progress: For current state
- Fact_Course_to_Cert_History: For course requirements history
- Fact_Program_History: For program context
- Dim_Cert: For certification details
- Dim_User: For learner information

## Notes
- Snapshots are created at fiscal year boundaries
- Maintains full certification history for compliance
- Tracks both initial certification and renewals
- Preserves status transition patterns
- Supports audit and compliance reporting
- Links to course and program histories

## Certification States
- Not Started: No progress toward certification
- In Progress: Working on requirements
- Certified: All requirements met
- Expired: Certification no longer valid
- Revoked: Certification administratively removed
- Renewed: Certification extended after expiration 