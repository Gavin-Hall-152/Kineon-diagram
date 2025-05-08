# Dim_Program_Progress

## Purpose
This dimension table tracks detailed progress information for each program-user combination. It maintains the current state of program completion, including assignment, start, and completion timestamps, enabling comprehensive tracking of learning pathways and career development progress.

## Key Features
- Tracks individual program progress
- Maintains detailed timestamps
- Records program status
- Enables pathway tracking
- Supports program analytics
- Facilitates career development

## Source Tables and Mappings

### analytics_prog_completions.csv (Primary Progress Data)
    Program_ID --> Program ID              # Program identifier
    User_ID --> User ID                    # Learner identifier
    Status --> Status                      # Current program state
    Time_assigned --> Time assigned        # Assignment timestamp
    Time_completed --> Time completed      # Completion timestamp
    Time_started --> Time started          # First component start

### analytics_prog_overview.csv (Program Context)
    Program_ID --> Program ID              # Program reference
    User_ID --> User ID                    # Learner reference

## Common Queries
- Individual program tracking
- Career path progression
- Time to completion analysis
- Program success rates
- Component completion patterns
- Assignment to start delays
- Completion trend analysis

## Related Tables
- Fact_Program_Progress: For status tracking
- Fact_Program_History: For historical analysis
- Fact_Course_Progress: For course components
- Fact_Certification_Progress: For certifications
- Dim_Programs: For program details
- Dim_User: For learner information

## Notes
- Tracks both mandatory and optional programs
- Maintains multiple progress timestamps
- Enables pathway analysis
- Supports career planning
- Links to historical snapshots
- Facilitates effectiveness analysis

## Program States
- Not Started: Assigned but not begun
- In Progress: Some components completed
- Completed: All requirements met
- Extended: Timeline adjusted
- Withdrawn: Removed from program
- Suspended: Temporarily paused

## Timestamp Tracking
The table tracks three key timestamps:
1. Time_assigned: When program was assigned
2. Time_started: When first component begun
3. Time_completed: When all components finished

## Progress Metrics
Enables calculation of:
- Time to completion
- Component completion rate
- Program velocity
- Success probability
- Pathway effectiveness
- Resource utilization

## Learning Pathways
Supports tracking of:
- Sequential progressions
- Parallel components
- Prerequisites
- Optional elements
- Alternative paths
- Specializations

## Analysis Capabilities
- Career path optimization
- Resource planning
- Performance prediction
- Success rate analysis
- Component sequencing
- Pathway effectiveness
- Bottleneck identification

## Career Development
Enables monitoring of:
- Skill progression
- Role preparation
- Qualification achievement
- Career advancement
- Specialization tracks
- Professional development 