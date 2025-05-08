# Fact_Course_to_Cert_History

## Purpose
This fact table maintains historical records of course-to-certification relationships, tracking how courses contribute to certification achievements over time. It enables analysis of certification pathways, course completion patterns, and historical progression through certification requirements.

## Key Features
- Tracks historical course-certification relationships
- Links courses to certification paths
- Maintains completion timestamps
- Enables progression analysis
- Supports program alignment
- Facilitates historical tracking

## Source Tables and Mappings

### Fact_Course_to_Cert_Progress (Current State)
    Cert_ID --> Cert_ID                    # Certification identifier
    Course_ID --> Course_ID                # Course identifier
    Course_User_ID --> Course_User_ID      # Course enrollment reference
    Date_Began --> Date_Began              # Start timestamp
    Date_Completed --> Date_Completed      # Completion timestamp
    Program_ID --> Program_ID              # Program context
    Program_User_ID --> Program_User_ID    # Program enrollment reference
    User_ID --> User_ID                    # Learner identifier
    SCORM_ID --> SCORM_ID                  # Content reference

### Dim_FY_Completed (Fiscal Year Reference)
    Date_Began --> FYStartDate             # Fiscal year start
    Date_Completed --> FYEndDate           # Fiscal year end

### Dim_FY_Began (Fiscal Year Reference)
    Date_Began --> FYStartDate             # Start fiscal year
    Date_Began --> FYEndDate               # End fiscal year

### Dim_Course_Progress (Progress State)
    Course_User_ID --> Course_User_ID      # Progress tracking
    Time_started --> Time started          # Initial engagement
    Completion_Status --> Completion Status # Achievement state

## Common Queries
- Historical certification paths
- Course completion trends
- Certification achievement patterns
- Program alignment analysis
- Learning path effectiveness
- Time-to-certification metrics
- Success rate tracking

## Related Tables
- Fact_Course_to_Cert_Progress: Current state
- Dim_Course: Course definitions
- Dim_Cert: Certification details
- Dim_User: Learner information
- Dim_Program: Program context
- Fact_Course_History: Course history
- Fact_Certification_History: Certification history

## Notes
- Maintains point-in-time snapshots
- Tracks relationship changes
- Enables trend analysis
- Supports audit requirements
- Facilitates compliance
- Preserves historical context

## Historical Tracking
Records:
- Relationship Changes
- Status Updates
- Completion Events
- Path Modifications
- Requirement Changes
- Achievement Milestones

## Analysis Capabilities
Enables analysis of:
- Certification Paths
- Success Patterns
- Time-to-Achievement
- Course Effectiveness
- Program Alignment
- Learning Outcomes

## Compliance Support
Maintains:
- Audit Trails
- Completion Records
- Achievement Evidence
- Progress History
- Status Changes
- Requirement Updates

## Reporting Functions
Provides insights into:
- Historical Trends
- Success Patterns
- Path Effectiveness
- Achievement Rates
- Program Impact
- Learning Outcomes 