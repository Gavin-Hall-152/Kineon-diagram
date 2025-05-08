# Dim_Certification_Progress

## Purpose
This dimension table tracks detailed progress information for each certification-user combination. It maintains the current state of certification achievement, including assignment, start, and completion timestamps, enabling comprehensive tracking of certification journeys and compliance status.

## Key Features
- Tracks individual certification progress
- Maintains detailed timestamps
- Records certification status
- Controls dashboard visibility
- Enables compliance tracking
- Supports certification analytics

## Source Tables and Mappings

### Analytics_cert_completions.Csv (Primary Progress Data)
    Certification_ID --> Certification ID   # Certification identifier
    User_ID --> User ID                    # Learner identifier
    Status --> Status                      # Current certification state
    Time_assigned --> Time assigned        # Assignment timestamp
    Time_completed --> Time completed      # Achievement timestamp
    Time_started --> Time started          # First requirement start
    Certification_Name --> Certification Name  # Certification title reference
    Include_in_dashboard --> Include in dashboard  # Visibility control

### Analytics_cert_overview.csv (Certification Context)
    Certification_ID --> Certification ID   # Certification reference
    User_ID --> User ID                    # Learner reference

## Common Queries
- Individual certification tracking
- Compliance status reporting
- Time to certification analysis
- Certification success rates
- Dashboard visibility filtering
- Assignment to start delays
- Completion trend analysis

## Related Tables
- Fact_Certification_Progress: For status tracking
- Fact_Certification_History: For historical analysis
- Fact_Course_to_Cert_Progress: For course requirements
- Dim_Cert: For certification details
- Dim_User: For learner information
- Dim_FY_Began/Completed: For fiscal year context

## Notes
- Tracks both initial and renewal certifications
- Maintains multiple progress timestamps
- Enables compliance reporting
- Supports audit requirements
- Links to historical snapshots
- Facilitates performance analysis

## Certification States
- Not Started: Assigned but not begun
- In Progress: Working on requirements
- Completed: All requirements met
- Expired: Past validity period
- Revoked: Administratively removed
- Renewed: Recertification achieved

## Timestamp Tracking
The table tracks three key timestamps:
1. Time_assigned: When certification was assigned
2. Time_started: When first requirement begun
3. Time_completed: When all requirements met

## Progress Metrics
Enables calculation of:
- Time to certification
- Requirement completion rate
- Certification velocity
- Success probability
- Compliance status
- Renewal patterns

## Dashboard Visibility
The Include_in_dashboard flag controls:
- Compliance dashboard presence
- Progress reporting inclusion
- Analytics visibility
- KPI calculations
- Status notifications

## Analysis Capabilities
- Certification path analysis
- Compliance tracking
- Performance prediction
- Resource planning
- Success rate analysis
- Renewal forecasting
- Risk assessment 