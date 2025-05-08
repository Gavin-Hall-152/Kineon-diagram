# Fact_Scorm

## Purpose
This fact table tracks detailed e-learning interactions through SCORM (Sharable Content Object Reference Model) packages. It serves as the primary source for monitoring online learning engagement, progress, and completion metrics across all e-learning content.

## Key Features
- Tracks detailed SCORM package interactions
- Monitors e-learning progress and completion
- Records precise learning time measurements
- Links to program structure for curriculum tracking
- Supports fiscal year-based analysis
- Enables granular e-learning analytics

## Source Tables and Mappings

### analytics_scorm.csv (Primary SCORM Data)
    User_ID --> User ID                    # Learner identifier
    Course_ID --> Course ID                # Course identifier
    SCORM_Title --> SCORM Title           # Title of SCORM package
    SCO_Start_Date --> SCO Start Date     # Learning object start time
    SCO_Status --> SCO Status             # Completion status
    SCO_Total_Time --> SCO Total Time (milliseconds)  # Duration of interaction

### analytics_prog_overview.csv (Program Context)
    Course_ID --> Course ID                # Links to program structure
    User_ID --> User ID                    # Learner identifier
    Program_ID --> Program ID              # Associated program

### Dim_Scorm (SCORM Package Details)
    SCORM_Title --> SCORM Title           # Package title
    SCORM_ID --> SCORM_ID                 # Unique package identifier

### Dim_Program_Progress (Program Context)
    Program_ID --> Program ID              # Program reference
    User_ID --> User ID                    # Learner reference
    Program_User_ID --> Program_User_ID    # Program-user combination ID

### Dim_Course_Progress (Course Context)
    Course_ID --> Course_ID                # Course reference
    User_ID --> User_ID                    # Learner reference
    Course_User_ID --> Course_User_ID      # Course-user combination ID

### Dim_FY_Began (Start Fiscal Year)
    SCO_Start_Date --> FYStartDate         # Fiscal year start
    SCO_Start_Date --> FYEndDate           # Fiscal year end

## Common Queries
- E-learning engagement metrics
- SCORM completion rates
- Time spent in e-learning modules
- Learning object effectiveness
- Program-based e-learning progress
- Fiscal year completion trends
- User engagement patterns

## Related Tables
- Fact_LearningTime: For overall time tracking
- Fact_Course_Progress: For course completion
- Dim_Course: For course details
- Dim_User: For learner information
- Fact_Program_Progress: For program context

## Notes
- Time measurements are in milliseconds
- Supports multiple SCORM versions
- Tracks individual learning object interactions
- Enables detailed e-learning analytics
- Maintains precise engagement metrics
- Links to broader learning programs 