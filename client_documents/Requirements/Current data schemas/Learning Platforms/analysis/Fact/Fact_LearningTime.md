# Fact_LearningTime

## Purpose
This fact table consolidates learning time data from both e-learning (SCORM) and in-person training sessions. It serves as the central source for analyzing time spent on learning activities across all delivery methods, enabling comprehensive tracking of learning engagement and duration.

## Key Features
- Combines both e-learning and in-person learning time metrics
- Tracks detailed session-level engagement
- Maintains SCORM-specific tracking for e-learning
- Links to program structure for hierarchical analysis
- Supports fiscal year-based time analysis
- Captures attendance and completion status

## Source Tables and Mappings

### analytics_scorm.csv (E-Learning Data)
    User_ID --> User ID                    # Learner identifier
    Course_ID --> Course ID                # Course identifier
    SCORM_Title --> SCORM Title           # Title of the SCORM package
    SCO_Start_Date --> SCO Start Date     # When the learning object was started
    SCO_Status --> SCO Status             # Completion status of the learning object
    SCO_Total_Time --> SCO Total Time (milliseconds)  # Time spent in e-learning

### analytics_prog_overview.csv (Program Context)
    Course_ID --> Course ID                # Links course to program
    User_ID --> User ID                    # Learner identifier
    Program_ID --> Program ID              # Program containing the course

### analytics_seminar_attendance.csv (In-Person Training Data)
    User_ID --> User ID                    # Learner identifier
    Course_ID --> Course ID                # Course identifier
    Event_ID --> Event ID                  # Training event identifier
    Session_ID --> Session ID              # Specific session identifier
    Session_Start_Date/Time --> Session Start Date/Time    # Session start timestamp
    Session_Finish_Date/Time --> Session Finish Date/Time  # Session end timestamp
    Session_attendance --> Session attendance              # Attendance status
    Session_Duration --> Session Duration                  # Length of session

### Dim_Scorm (E-Learning Content Details)
    SCORM_Title --> SCORM Title           # Title of learning object
    SCORM_ID --> SCORM_ID                 # Unique SCORM package identifier

### Dim_Program_Progress (Program Context)
    Program_ID --> Program ID              # Program identifier
    User_ID --> User ID                    # Learner identifier
    Program_User_ID --> Program_User_ID    # Program-user combination ID

### Dim_Course_Progress (Course Context)
    Course_ID --> Course_ID                # Course identifier
    User_ID --> User_ID                    # Learner identifier
    Course_User_ID --> Course_User_ID      # Course-user combination ID

### Dim_FY_Completed (Completion Fiscal Year)
    Session_Finish_Date/Time --> FYStartDate    # Fiscal year start for completion
    Session_Finish_Date/Time --> FYEndDate      # Fiscal year end for completion

### Dim_FY_Began (Start Fiscal Year)
    SCO_Start_Date/Session_Start_Date --> FYStartDate    # Fiscal year start for beginning
    SCO_Start_Date/Session_Start_Date --> FYEndDate      # Fiscal year end for beginning

## Common Queries
- Total learning time by delivery method
- Average session duration analysis
- Learning engagement patterns
- Program-based time investment
- Attendance rate analysis
- E-learning vs in-person time comparison
- Fiscal year-based learning time trends

## Related Tables
- Fact_Course_Progress: For completion status
- Fact_Scorm: For detailed e-learning tracking
- Fact_Seminar_Signup: For session registration
- Dim_Course: For course details
- Dim_User: For learner information
- Dim_Seminar_Session: For session details

## Notes
- Time is tracked in milliseconds for e-learning
- Session duration is stored in minutes for in-person training
- Supports both scheduled (in-person) and self-paced (e-learning) formats
- Enables blended learning analysis 