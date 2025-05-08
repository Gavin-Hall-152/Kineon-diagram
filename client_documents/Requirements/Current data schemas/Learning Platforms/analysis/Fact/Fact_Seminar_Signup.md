# Fact_Seminar_Signup

## Purpose
This fact table manages in-person training registrations and attendance tracking. It serves as the primary source for monitoring seminar participation, session scheduling, and physical training delivery, enabling comprehensive tracking of classroom-based learning activities.

## Key Features
- Tracks seminar registration and attendance
- Manages session scheduling and duration
- Records actual participation status
- Links to course and event hierarchies
- Supports fiscal year-based analysis
- Enables capacity and attendance planning

## Source Tables and Mappings

### analytics_seminar_attendance.csv (Primary Seminar Data)
    User_ID --> User ID                    # Learner identifier
    Event_ID --> Event ID                  # Training event reference
    Session_ID --> Session ID              # Specific session identifier
    Course_ID --> Course ID                # Associated course
    Session_Start_Date/Time --> Session Start Date/Time    # Session start
    Session_Finish_Date/Time --> Session Finish Date/Time  # Session end
    Session_attendance --> Session attendance              # Actual attendance status
    Signup_status --> Signup status                       # Registration status
    Session_Duration --> Session Duration                  # Planned duration

### Dim_FY_Completed (Completion Fiscal Year)
    Session_Finish_Date/Time --> FYStartDate    # Fiscal year start for completion
    Session_Finish_Date/Time --> FYEndDate      # Fiscal year end for completion

### Dim_FY_Began (Start Fiscal Year)
    Session_Start_Date/Time --> FYStartDate     # Fiscal year start for session
    Session_Start_Date/Time --> FYEndDate       # Fiscal year end for session

## Common Queries
- Session attendance rates
- Registration vs attendance analysis
- Capacity utilization metrics
- Session scheduling patterns
- Training delivery effectiveness
- Participant engagement tracking
- Resource utilization analysis

## Related Tables
- Fact_LearningTime: For overall time tracking
- Fact_Course_Progress: For course completion
- Dim_Seminar_Event: For event details
- Dim_Seminar_Session: For session details
- Dim_Course: For course information
- Dim_User: For participant information

## Notes
- Supports multiple attendance statuses (Present, Absent, Cancelled)
- Tracks both registration and actual attendance
- Enables capacity planning and resource allocation
- Records precise session timing and duration
- Links to broader course completion tracking
- Facilitates venue and resource management

## Status Definitions
### Signup Status
- Registered: Initial registration
- Waitlisted: On waiting list
- Cancelled: Registration cancelled
- Confirmed: Attendance confirmed

### Attendance Status
- Present: Attended session
- Absent: Did not attend
- Partial: Partial attendance
- Excused: Excused absence 