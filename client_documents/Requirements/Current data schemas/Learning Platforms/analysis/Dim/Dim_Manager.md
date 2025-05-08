# Dim_Manager

## Purpose
This dimension table maintains manager information and hierarchical relationships within the organization. It serves as a reference for reporting structures, team management, and organizational analytics, enabling comprehensive tracking of learning and development at the management level.

## Key Features
- Stores manager identification
- Maintains management hierarchy
- Enables team analytics
- Supports organizational reporting
- Tracks management relationships
- Facilitates team performance analysis

## Source Tables and Mappings

### UserHeirarchy (Management Structure)
    Manager --> managerName               # Manager's full name
    Manager_ID --> manager_id             # Unique manager identifier

## Common Queries
- Team composition analysis
- Management hierarchy reporting
- Direct report listings
- Team performance metrics
- Management span analysis
- Organizational structure reporting
- Leadership development tracking

## Related Tables
- Dim_User: For user details
- Dim_Manager_Relationship: For reporting history
- Fact_Course_Progress: For team learning
- Fact_Certification_Progress: For team compliance
- Fact_Program_Progress: For leadership development

## Notes
- Default record (Manager_ID = -1) exists for handling unknown managers
- Supports multiple management levels
- Enables hierarchical reporting
- Maintains management relationships
- Supports team analytics
- Facilitates organizational analysis

## Management Levels
- Executive Leadership
- Senior Management
- Middle Management
- Team Leaders
- Project Managers
- Technical Leads

## Team Management
Enables tracking of:
- Direct Reports
- Team Size
- Reporting Structure
- Team Composition
- Resource Allocation
- Performance Metrics

## Management Analytics
Supports analysis of:
- Team Performance
- Learning Compliance
- Development Progress
- Certification Status
- Resource Utilization
- Leadership Effectiveness

## Reporting Capabilities
Provides insights into:
- Team Structure
- Management Hierarchy
- Reporting Lines
- Span of Control
- Team Distribution
- Leadership Coverage

## Leadership Development
Tracks:
- Management Training
- Leadership Programs
- Team Development
- Succession Planning
- Performance Management
- Career Progression

## Organizational Impact
Measures:
- Team Success Rates
- Management Effectiveness
- Learning Culture
- Compliance Achievement
- Development Progress
- Leadership Quality 