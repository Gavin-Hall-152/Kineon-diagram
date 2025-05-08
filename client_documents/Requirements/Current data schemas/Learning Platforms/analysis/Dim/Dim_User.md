# Dim_User

## Purpose
This dimension table serves as the central repository for user information, containing all relevant details about learners in the system. It maintains the organizational hierarchy and user relationships, essential for both learning management and reporting.

## Key Features
- Stores user identification and personal information
- Maintains organizational structure relationships
- Tracks reporting lines (managers and appraisers)
- Preserves user status information
- Supports hierarchical reporting capabilities
- Enables organizational analytics

## Source Tables and Mappings

### analytics_users.csv (Primary User Data)
    User_ID --> User ID                    # Primary identifier for the user
    User's_Fullname --> User's Fullname    # Complete name of the user
    User_First_Name --> User First Name    # User's given name
    User_Last_Name --> User Last Name      # User's family name
    Assignment_ID --> Assignment ID        # Current role assignment identifier
    Assignment_Name --> Assignment Name    # Name of current role/assignment
    Organisation_ID --> Organisation ID    # Identifier for user's organization
    Organisation_Name --> Organisation Name # Name of user's organization
    Position_ID --> Position ID           # Identifier for user's position
    Position_Name --> Position Name       # Name of user's position/role
    Manager_ID --> Manager ID             # ID of user's direct manager
    Manager_Name --> Manager Name         # Name of user's direct manager
    Appraiser_ID --> Appraiser ID        # ID of user's performance appraiser
    Appraiser_Name --> Appraiser Name    # Name of user's performance appraiser
    User_Status --> User Status          # Current status of the user (Active/Inactive)

## Common Queries
- Organizational hierarchy analysis
- Manager-subordinate relationships
- Department-based learning progress
- Position-based compliance tracking
- User status reporting
- Team performance analysis
- Role-based learning patterns

## Related Tables
- Dim_Manager: For detailed manager information
- Dim_Manager_Relationship: For reporting line history
- Fact_Course_Progress: For user learning activities
- Fact_Certification_Progress: For user certifications
- Fact_Program_Progress: For user program participation

## Notes
- Default record (User_ID = -1) exists for handling missing/unknown users
- Supports both current and historical organizational structures
- Used in all fact tables for user-related analysis
- Maintains hierarchical relationships
- Enables role-based analysis
- Supports compliance tracking

## Organizational Structure
Hierarchy levels:
- Organization
- Department
- Team
- Position
- Individual

Reporting relationships:
- Direct Manager
- Performance Appraiser
- Matrix Relationships
- Project Assignments

## User Status Types
- Active: Current employee
- Inactive: Former employee
- On Leave: Temporary absence
- Transferred: Role change
- Contractor: External worker
- Consultant: External expert

## Role Management
Tracks:
- Current Position
- Role Assignments
- Job Functions
- Responsibilities
- Reporting Lines
- Team Memberships

## Compliance Requirements
Enables tracking of:
- Mandatory Training
- Role Certifications
- Safety Requirements
- Regulatory Compliance
- Professional Development
- Skill Maintenance

## Analysis Capabilities
Supports analysis of:
- Team Performance
- Department Progress
- Role-based Learning
- Compliance Status
- Career Development
- Skill Distribution

## Reporting Functions
Enables reporting on:
- Organizational Structure
- Team Composition
- Role Distribution
- Compliance Status
- Learning Progress
- Performance Metrics

## Data Security
Manages:
- Access Levels
- Role Permissions
- Data Visibility
- Report Access
- System Privileges
- Content Restrictions 