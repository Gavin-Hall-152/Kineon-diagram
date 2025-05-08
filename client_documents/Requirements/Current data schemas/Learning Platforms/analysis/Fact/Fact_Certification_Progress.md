# Fact_Certification_Progress

## Purpose
This fact table tracks user progress and status in certification programs. It serves as the primary source for monitoring certification achievements, expiration dates, and overall certification compliance across the organization.

## Key Features
- Tracks certification status and expiration
- Maintains assignment and completion timestamps
- Links to fiscal year dimensions for time-based analysis
- Supports certification compliance monitoring
- Enables certification validity tracking

## Source Tables and Mappings

### Analytics_cert_completions.Csv (Primary Certification Data)
    User_ID --> User ID                    # Learner identifier
    Certification_ID --> Certification ID   # Certification identifier
    Time_Expires --> Time Expires          # When the certification expires
    Status --> Status                      # Current certification status

### Dim_Certification_Progress (Certification Details)
    Certification_ID --> Certification ID   # Certification reference
    User_ID --> User ID                    # Learner reference
    Certification_User_ID --> Certification_User_ID  # Unique certification-user combination
    Time_assigned --> Time assigned        # When user was assigned the certification
    Time_completed --> Time completed      # When certification was achieved

### Dim_FY_Completed (Completion Fiscal Year)
    Date_Completed --> FYStartDate         # Start of fiscal year when completed
    Date_Completed --> FYEndDate           # End of fiscal year when completed

### Dim_FY_Began (Assignment Fiscal Year)
    Date_Began --> FYStartDate            # Start of fiscal year when assigned
    Date_Began --> FYEndDate              # End of fiscal year when assigned

## Common Queries
- Certification completion rates
- Time to certification analysis
- Expiration tracking and renewals
- Compliance status reporting
- Certification trends by fiscal year
- Assignment to completion duration
- Certification status distribution

## Related Tables
- Fact_Course_to_Cert_Progress: For required courses tracking
- Fact_Certification_History: For historical snapshots
- Dim_Cert: For certification requirements
- Dim_User: For learner information
- Fact_Course_Progress: For component course completion

## Notes
- Supports multiple certification statuses (e.g., In Progress, Completed, Expired)
- Tracks both mandatory and optional certifications
- Enables compliance reporting and forecasting
- Links to course completions through Fact_Course_to_Cert_Progress
- Maintains certification validity periods 