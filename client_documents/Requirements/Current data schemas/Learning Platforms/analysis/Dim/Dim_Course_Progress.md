# Dim_Course_Progress

## Purpose
This dimension table tracks detailed progress information for each course-user combination. It maintains the current state of learning progress, including enrollment, start and completion timestamps, enabling comprehensive tracking of individual learning journeys and course effectiveness.

## Key Features
- Tracks individual course progress
- Maintains detailed timestamps
- Records completion status
- Preserves course context
- Enables progress analysis
- Supports learning analytics

## Source Tables and Mappings

### analytics_course_completions.csv (Progress Data)
    Course_ID --> Course ID                # Course identifier
    User_ID --> User ID                    # Learner identifier
    Course_Name --> Course Name            # Course title reference
    Course_Category --> Course Category    # Course classification
    Completion_Status --> Completion Status # Current progress state
    Time_enrolled --> Time enrolled        # Enrollment timestamp
    Time_started --> Time started          # First access timestamp
    Time_completed --> Time completed      # Completion timestamp

## Common Queries
- Individual progress tracking
- Course completion rates
- Time to completion analysis
- Learning engagement patterns
- Category performance metrics
- Enrollment to start delays
- Completion trend analysis

## Related Tables
- Fact_Course_Progress: For progress tracking
- Fact_Course_History: For historical analysis
- Fact_LearningTime: For engagement metrics
- Dim_Course: For course details
- Dim_User: For learner information
- Dim_FY_Began/Completed: For fiscal year context

## Notes
- Tracks both e-learning and classroom progress
- Maintains multiple progress timestamps
- Enables detailed analytics
- Supports completion reporting
- Links to historical snapshots
- Facilitates performance analysis

## Progress States
- Not Started: Enrolled but not begun
- In Progress: Started but not completed
- Completed: All requirements met
- Failed: Did not meet requirements
- Withdrawn: Removed from course
- Expired: Past completion deadline

## Timestamp Tracking
The table tracks three key timestamps:
1. Time_enrolled: When the user was assigned
2. Time_started: When first accessed
3. Time_completed: When requirements met

## Progress Metrics
Enables calculation of:
- Time to first access
- Total completion time
- Active learning time
- Completion rates
- Progress velocity
- Engagement patterns

## Analysis Capabilities
- Individual progress tracking
- Cohort analysis
- Performance benchmarking
- Engagement assessment
- Completion prediction
- Resource utilization
- Learning effectiveness 