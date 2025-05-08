# Dim_Manager_Relationship

## Purpose
This dimension table tracks the relationships between managers and their direct reports, including historical changes and relationship types. It enables detailed analysis of organizational structure, reporting lines, and management effectiveness across the learning platform.

## Key Features
- Tracks manager-employee relationships
- Maintains relationship history
- Defines relationship types
- Supports organizational analysis
- Enables hierarchy tracking
- Facilitates succession planning

## Source Tables and Mappings

### UserHeirarchy (Relationship Data)
    Manager_ID --> manager_id              # Manager identifier
    Employee_ID --> employee_id            # Direct report identifier
    Relationship_Type --> relationship_type # Nature of reporting relationship

## Common Queries
- Direct report listings
- Reporting line changes
- Team structure analysis
- Historical relationship tracking
- Management transitions
- Organizational changes
- Succession patterns

## Related Tables
- Dim_Manager: For manager details
- Dim_User: For employee information
- Fact_Course_Progress: For team learning
- Fact_Certification_Progress: For team compliance
- Fact_Program_Progress: For team development

## Notes
- Maintains relationship history
- Supports multiple relationship types
- Enables organizational analysis
- Tracks reporting changes
- Supports succession planning
- Facilitates team analytics

## Relationship Types
- Direct Manager: Primary reporting line
- Matrix Manager: Secondary oversight
- Project Manager: Temporary assignment
- Technical Lead: Skill-based reporting
- Mentor: Development relationship
- Acting Manager: Temporary coverage

## Historical Tracking
Maintains history of:
- Reporting Changes
- Team Transitions
- Role Changes
- Acting Assignments
- Temporary Relations
- Organization Changes

## Team Structure
Enables analysis of:
- Reporting Lines
- Team Composition
- Management Layers
- Matrix Relationships
- Project Teams
- Development Paths

## Management Changes
Tracks:
- Manager Transitions
- Team Restructuring
- Role Reassignments
- Acting Periods
- Temporary Teams
- Project Assignments

## Succession Planning
Supports:
- Leadership Pipeline
- Skill Development
- Career Progression
- Role Transitions
- Team Development
- Talent Management

## Analysis Capabilities
Enables analysis of:
- Management Effectiveness
- Team Stability
- Reporting Patterns
- Organization Evolution
- Development Paths
- Leadership Growth

## Compliance Tracking
Monitors:
- Required Relationships
- Reporting Structure
- Management Coverage
- Team Assignments
- Role Requirements
- Regulatory Compliance 