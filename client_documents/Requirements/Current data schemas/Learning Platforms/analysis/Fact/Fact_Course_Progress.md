# Fact_Course_Progress

## Purpose
This fact table tracks individual user progress and completion status for each course. It serves as the primary table for monitoring course-level learning activities, connecting users to their course enrollments and completions.

## Key Features
- Tracks both standalone courses and courses within programs
- Maintains enrollment and completion timestamps
- Links to fiscal year dimensions for time-based analysis
- Connects to program progress for hierarchical learning paths

## Source Tables and Mappings

### analytics_course_completions.csv (Primary Course Data)
    User_ID --> User ID                    # Unique identifier for the learner
    Course_ID --> Course ID                # Unique identifier for the course
    Time_enrolled --> Time enrolled        # When the user was enrolled in the course
    Time_completed --> Time completed      # When the user completed the course
    Completion_Due_Date --> Completion Due Date  # Deadline for course completion

### analytics_prog_overview.csv (Program Context)
    Course_ID --> Course ID                # Links course to program structure
    User_ID --> User ID                    # User taking the course
    Program_ID --> Program ID              # Program containing the course

### Dim_Course_Progress (Course Progress Details)
    Course_ID --> Course_ID                # Course reference
    User_ID --> User_ID                    # User reference
    Course_User_ID --> Course_User_ID      # Unique identifier for course-user combination

### Dim_Program_Progress (Program Context)
    Program_ID --> Program ID              # Program reference
    User_ID --> User ID                    # User reference
    Program_User_ID --> Program_User_ID    # Unique identifier for program-user combination
    Time_assigned --> Time assigned        # When user was assigned to program

### Dim_FY_Completed (Completion Fiscal Year)
    Date_Completed --> FYStartDate         # Start of fiscal year when completed
    Date_Completed --> FYEndDate           # End of fiscal year when completed

### Dim_FY_Began (Enrollment Fiscal Year)
    Date_Began --> FYStartDate            # Start of fiscal year when enrolled
    Date_Began --> FYEndDate              # End of fiscal year when enrolled

## Common Queries
- Course completion rates by time period
- Time to completion analysis
- Due date compliance tracking
- Program-related course progress
- User learning path progression

## Related Tables
- Fact_Program_Progress: For program-level analysis
- Fact_Course_History: For historical snapshots
- Dim_Course: For course details
- Dim_User: For user information 