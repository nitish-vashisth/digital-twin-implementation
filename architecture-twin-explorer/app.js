// ----------------------------------------------------------
// Architecture Twin Explorer
// ----------------------------------------------------------

let cy;
let graphNodes = [];
let graphEdges = [];
let state = {
    selectedNodeId: null,
    activeCluster: null
};

const fallbackNodes = [
    { data: { id: 'payments', label: 'Payments', type: 'Project', risk: 'High', cluster: 'finance', summary: 'Core payments platform owning the merchant settlement lifecycle.', owner: 'Finance Engineering', cloudReady: 78, migrationRecommendation: 'Wave 4', relatedObjects: ['Finance Workflow', 'Finance Board', 'Finance Permission', 'Tempo', 'ScriptRunner'] }, position: { x: 120, y: 180 } },
    { data: { id: 'billing', label: 'Billing', type: 'Project', risk: 'High', cluster: 'finance', summary: 'Invoices and billing orchestration for global revenue operations.', owner: 'Finance Engineering', cloudReady: 72, migrationRecommendation: 'Wave 3', relatedObjects: ['Finance Workflow', 'Finance Board', 'Tempo'] }, position: { x: 280, y: 180 } },
    { data: { id: 'invoice', label: 'Invoice', type: 'Project', risk: 'Medium', cluster: 'finance', summary: 'Invoice processing and reconciliation services.', owner: 'Operations', cloudReady: 81, migrationRecommendation: 'Wave 2', relatedObjects: ['Finance Workflow', 'Finance Board', 'Assets'] }, position: { x: 440, y: 180 } },
    { data: { id: 'refund', label: 'Refund', type: 'Project', risk: 'Medium', cluster: 'finance', summary: 'Refund handling and dispute resolution workflows.', owner: 'Payments Ops', cloudReady: 76, migrationRecommendation: 'Wave 4', relatedObjects: ['Finance Workflow', 'Finance Permission'] }, position: { x: 600, y: 180 } },
    { data: { id: 'compliance', label: 'Compliance', type: 'Project', risk: 'Medium', cluster: 'finance', summary: 'Regulatory controls and audit evidence management.', owner: 'GRC', cloudReady: 84, migrationRecommendation: 'Wave 2', relatedObjects: ['Finance Board', 'Finance Permission'] }, position: { x: 760, y: 180 } },
    { data: { id: 'finance-workflow', label: 'Finance Workflow', type: 'Workflow', risk: 'High', cluster: 'finance', summary: 'Shared workflow for finance approvals and escalations.', owner: 'Finance PMO', cloudReady: 69, migrationRecommendation: 'Wave 3', relatedObjects: ['Payments', 'Billing', 'Invoice'] }, position: { x: 200, y: 320 } },
    { data: { id: 'finance-board', label: 'Finance Board', type: 'Board', risk: 'High', cluster: 'finance', summary: 'Kanban board for finance operations tracking.', owner: 'Operations', cloudReady: 74, migrationRecommendation: 'Wave 2', relatedObjects: ['Payments', 'Billing'] }, position: { x: 360, y: 320 } },
    { data: { id: 'finance-filter', label: 'Finance Filter', type: 'Filter', risk: 'Medium', cluster: 'finance', summary: 'Saved filters used by finance teams and auditors.', owner: 'Finance Ops', cloudReady: 81, migrationRecommendation: 'Wave 1', relatedObjects: ['Finance Board'] }, position: { x: 520, y: 320 } },
    { data: { id: 'finance-permission', label: 'Finance Permission', type: 'PermissionScheme', risk: 'High', cluster: 'finance', summary: 'Security model covering finance roles and approvals.', owner: 'IT Security', cloudReady: 67, migrationRecommendation: 'Wave 4', relatedObjects: ['Payments', 'Invoice', 'Refund'] }, position: { x: 680, y: 320 } },
    { data: { id: 'payment-automation', label: 'Payment Automation', type: 'Automation', risk: 'High', cluster: 'finance', summary: 'Automation rules for payment retries and reconciliation.', owner: 'Automation', cloudReady: 73, migrationRecommendation: 'Wave 3', relatedObjects: ['Payments'] }, position: { x: 840, y: 320 } },
    { data: { id: 'tempo', label: 'Tempo', type: 'MarketplaceApp', risk: 'Medium', cluster: 'finance', summary: 'Timesheet and planning app used by finance delivery teams.', owner: 'IT', cloudReady: 86, migrationRecommendation: 'Wave 1', relatedObjects: ['Payments', 'Billing'] }, position: { x: 220, y: 460 } },
    { data: { id: 'scriptrunner', label: 'ScriptRunner', type: 'MarketplaceApp', risk: 'High', cluster: 'finance', summary: 'Custom scripting app for complex finance automations.', owner: 'Platform', cloudReady: 63, migrationRecommendation: 'Wave 4', relatedObjects: ['Payments', 'Security'] }, position: { x: 380, y: 460 } },
    { data: { id: 'assets', label: 'Assets', type: 'MarketplaceApp', risk: 'Medium', cluster: 'finance', summary: 'Asset inventory and configuration companion.', owner: 'Platform', cloudReady: 79, migrationRecommendation: 'Wave 2', relatedObjects: ['Invoice', 'HR'] }, position: { x: 540, y: 460 } },
    { data: { id: 'finance-team', label: 'Finance Team', type: 'Group', risk: 'Low', cluster: 'finance', summary: 'Core finance group owning delivery and operations.', owner: 'Finance Leadership', cloudReady: 90, migrationRecommendation: 'Wave 1', relatedObjects: ['Payments', 'Invoice'] }, position: { x: 700, y: 460 } },
    { data: { id: 'alice', label: 'Alice', type: 'User', risk: 'Low', cluster: 'finance', summary: 'Finance operations lead and platform steward.', owner: 'Finance', cloudReady: 90, migrationRecommendation: 'Wave 1', relatedObjects: ['Finance Team'] }, position: { x: 860, y: 460 } },

    { data: { id: 'hr', label: 'HR', type: 'Project', risk: 'Low', cluster: 'hr', summary: 'HR service delivery and policy management.', owner: 'People Ops', cloudReady: 87, migrationRecommendation: 'Wave 1', relatedObjects: ['HR Workflow', 'HR Board', 'HR Permission'] }, position: { x: 120, y: 760 } },
    { data: { id: 'recruitment', label: 'Recruitment', type: 'Project', risk: 'Low', cluster: 'hr', summary: 'Hiring lifecycle and candidate progression.', owner: 'Talent Acquisition', cloudReady: 85, migrationRecommendation: 'Wave 1', relatedObjects: ['HR Workflow', 'HR Permission'] }, position: { x: 280, y: 760 } },
    { data: { id: 'learning', label: 'Learning', type: 'Project', risk: 'Low', cluster: 'hr', summary: 'Learning pathways and enablement programs.', owner: 'L&D', cloudReady: 83, migrationRecommendation: 'Wave 1', relatedObjects: ['HR Workflow', 'HR Permission'] }, position: { x: 440, y: 760 } },
    { data: { id: 'onboarding', label: 'Onboarding', type: 'Project', risk: 'Low', cluster: 'hr', summary: 'Employee onboarding and provisioning workflows.', owner: 'People Ops', cloudReady: 88, migrationRecommendation: 'Wave 1', relatedObjects: ['HR Workflow', 'HR Board'] }, position: { x: 600, y: 760 } },
    { data: { id: 'hr-workflow', label: 'HR Workflow', type: 'Workflow', risk: 'Low', cluster: 'hr', summary: 'HR approvals and review states for employee processes.', owner: 'People Ops', cloudReady: 88, migrationRecommendation: 'Wave 1', relatedObjects: ['HR', 'Recruitment'] }, position: { x: 200, y: 900 } },
    { data: { id: 'hr-board', label: 'HR Board', type: 'Board', risk: 'Low', cluster: 'hr', summary: 'Board for recruiting and employee lifecycle tracking.', owner: 'People Ops', cloudReady: 90, migrationRecommendation: 'Wave 1', relatedObjects: ['HR', 'Recruitment'] }, position: { x: 360, y: 900 } },
    { data: { id: 'hr-filter', label: 'HR Filter', type: 'Filter', risk: 'Low', cluster: 'hr', summary: 'Saved filters for hiring and employee management.', owner: 'People Ops', cloudReady: 88, migrationRecommendation: 'Wave 1', relatedObjects: ['HR Board'] }, position: { x: 520, y: 900 } },
    { data: { id: 'hr-permission', label: 'HR Permission', type: 'PermissionScheme', risk: 'Low', cluster: 'hr', summary: 'Permission scheme controlling HR access and data visibility.', owner: 'IT Security', cloudReady: 86, migrationRecommendation: 'Wave 1', relatedObjects: ['HR', 'Recruitment', 'Learning'] }, position: { x: 680, y: 900 } },
    { data: { id: 'hr-automation', label: 'HR Automation', type: 'Automation', risk: 'Low', cluster: 'hr', summary: 'Automation flows for onboarding and approvals.', owner: 'Automation', cloudReady: 91, migrationRecommendation: 'Wave 1', relatedObjects: ['HR'] }, position: { x: 840, y: 900 } },
    { data: { id: 'hr-team', label: 'HR Team', type: 'Group', risk: 'Low', cluster: 'hr', summary: 'People operations coordination group.', owner: 'People Leadership', cloudReady: 90, migrationRecommendation: 'Wave 1', relatedObjects: ['HR', 'Recruitment'] }, position: { x: 220, y: 1040 } },
    { data: { id: 'bob', label: 'Bob', type: 'User', risk: 'Low', cluster: 'hr', summary: 'HR delivery lead and service manager.', owner: 'People Ops', cloudReady: 92, migrationRecommendation: 'Wave 1', relatedObjects: ['HR Team'] }, position: { x: 380, y: 1040 } },

    { data: { id: 'platform', label: 'Platform', type: 'Project', risk: 'Medium', cluster: 'engineering', summary: 'Core engineering platform and internal developer tooling.', owner: 'Platform Engineering', cloudReady: 74, migrationRecommendation: 'Wave 3', relatedObjects: ['Engineering Workflow', 'Engineering Board', 'Engineering Permission'] }, position: { x: 1180, y: 180 } },
    { data: { id: 'security', label: 'Security', type: 'Project', risk: 'High', cluster: 'engineering', summary: 'Security controls and access governance for the estate.', owner: 'Security', cloudReady: 71, migrationRecommendation: 'Wave 4', relatedObjects: ['Engineering Workflow', 'Engineering Permission', 'ScriptRunner'] }, position: { x: 1340, y: 180 } },
    { data: { id: 'devops', label: 'DevOps', type: 'Project', risk: 'Medium', cluster: 'engineering', summary: 'Delivery automation and release execution support.', owner: 'Platform Engineering', cloudReady: 79, migrationRecommendation: 'Wave 2', relatedObjects: ['Engineering Workflow', 'Engineering Board'] }, position: { x: 1500, y: 180 } },
    { data: { id: 'engineering-workflow', label: 'Engineering Workflow', type: 'Workflow', risk: 'Medium', cluster: 'engineering', summary: 'Workflow for build, release and incident coordination.', owner: 'Platform Engineering', cloudReady: 75, migrationRecommendation: 'Wave 3', relatedObjects: ['Platform', 'Security'] }, position: { x: 1260, y: 320 } },
    { data: { id: 'engineering-board', label: 'Engineering Board', type: 'Board', risk: 'Medium', cluster: 'engineering', summary: 'Shared planning board for platform and security teams.', owner: 'Engineering Leadership', cloudReady: 78, migrationRecommendation: 'Wave 2', relatedObjects: ['Platform', 'DevOps'] }, position: { x: 1420, y: 320 } },
    { data: { id: 'engineering-filter', label: 'Engineering Filter', type: 'Filter', risk: 'Medium', cluster: 'engineering', summary: 'Saved filters for build, incident and feature work.', owner: 'Engineering Ops', cloudReady: 80, migrationRecommendation: 'Wave 2', relatedObjects: ['Engineering Board'] }, position: { x: 1580, y: 320 } },
    { data: { id: 'engineering-permission', label: 'Engineering Permission', type: 'PermissionScheme', risk: 'Medium', cluster: 'engineering', summary: 'Permission framework governing engineering operations.', owner: 'IT Security', cloudReady: 73, migrationRecommendation: 'Wave 3', relatedObjects: ['Platform', 'Security'] }, position: { x: 1740, y: 320 } },
    { data: { id: 'platform-automation', label: 'Platform Automation', type: 'Automation', risk: 'Medium', cluster: 'engineering', summary: 'Automation for deployment quality gates and release controls.', owner: 'Automation', cloudReady: 76, migrationRecommendation: 'Wave 2', relatedObjects: ['Platform', 'DevOps'] }, position: { x: 1900, y: 320 } },
    { data: { id: 'eng-team', label: 'Engineering Team', type: 'Group', risk: 'Low', cluster: 'engineering', summary: 'Cross-functional engineering delivery group.', owner: 'Engineering Leadership', cloudReady: 85, migrationRecommendation: 'Wave 2', relatedObjects: ['Platform', 'Security'] }, position: { x: 1340, y: 460 } },
    { data: { id: 'charlie', label: 'Charlie', type: 'User', risk: 'Low', cluster: 'engineering', summary: 'Engineering lead and architecture steward.', owner: 'Engineering', cloudReady: 89, migrationRecommendation: 'Wave 1', relatedObjects: ['Engineering Team'] }, position: { x: 1500, y: 460 } },

    { data: { id: 'marketing', label: 'Marketing', type: 'Project', risk: 'Low', cluster: 'marketing', summary: 'Campaign operations and content coordination.', owner: 'Marketing Ops', cloudReady: 82, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing Workflow', 'Marketing Board'] }, position: { x: 1180, y: 760 } },
    { data: { id: 'sales', label: 'Sales', type: 'Project', risk: 'Medium', cluster: 'marketing', summary: 'Sales planning and customer lifecycle orchestration.', owner: 'Sales Operations', cloudReady: 76, migrationRecommendation: 'Wave 2', relatedObjects: ['Marketing Workflow', 'Marketing Permission'] }, position: { x: 1340, y: 760 } },
    { data: { id: 'customer-success', label: 'Customer Success', type: 'Project', risk: 'Low', cluster: 'marketing', summary: 'Customer onboarding and lifecycle success operations.', owner: 'Success Ops', cloudReady: 84, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing Board', 'Marketing Permission'] }, position: { x: 1500, y: 760 } },
    { data: { id: 'marketing-workflow', label: 'Marketing Workflow', type: 'Workflow', risk: 'Low', cluster: 'marketing', summary: 'Workflow for campaign approvals and release tracking.', owner: 'Marketing Ops', cloudReady: 84, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing', 'Sales'] }, position: { x: 1260, y: 900 } },
    { data: { id: 'marketing-board', label: 'Marketing Board', type: 'Board', risk: 'Low', cluster: 'marketing', summary: 'Board for campaign planning and launch readiness.', owner: 'Marketing Ops', cloudReady: 85, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing', 'Customer Success'] }, position: { x: 1420, y: 900 } },
    { data: { id: 'marketing-filter', label: 'Marketing Filter', type: 'Filter', risk: 'Low', cluster: 'marketing', summary: 'Saved filters for campaigns and reporting.', owner: 'Marketing Ops', cloudReady: 86, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing Board'] }, position: { x: 1580, y: 900 } },
    { data: { id: 'marketing-permission', label: 'Marketing Permission', type: 'PermissionScheme', risk: 'Low', cluster: 'marketing', summary: 'Permission scheme for marketing and success teams.', owner: 'IT Security', cloudReady: 83, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing', 'Sales'] }, position: { x: 1740, y: 900 } },
    { data: { id: 'marketing-automation', label: 'Marketing Automation', type: 'Automation', risk: 'Low', cluster: 'marketing', summary: 'Automation for campaign nurturing and release triggers.', owner: 'Automation', cloudReady: 87, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing'] }, position: { x: 1900, y: 900 } },
    { data: { id: 'marketing-team', label: 'Marketing Team', type: 'Group', risk: 'Low', cluster: 'marketing', summary: 'Shared team for campaigns and customer success.', owner: 'Marketing Leadership', cloudReady: 88, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing', 'Customer Success'] }, position: { x: 1340, y: 1040 } },
    { data: { id: 'diana', label: 'Diana', type: 'User', risk: 'Low', cluster: 'marketing', summary: 'Marketing operations lead and experience designer.', owner: 'Marketing', cloudReady: 91, migrationRecommendation: 'Wave 1', relatedObjects: ['Marketing Team'] }, position: { x: 1500, y: 1040 } }
];

const fallbackEdges = [
    { data: { id: 'e1', source: 'payments', target: 'finance-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e2', source: 'billing', target: 'finance-workflow', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e3', source: 'invoice', target: 'finance-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e4', source: 'refund', target: 'finance-workflow', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e5', source: 'payments', target: 'finance-board', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e6', source: 'billing', target: 'finance-board', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e7', source: 'invoice', target: 'finance-board', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e8', source: 'finance-board', target: 'finance-filter', label: 'USES', type: 'USES' } },
    { data: { id: 'e9', source: 'payments', target: 'finance-permission', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e10', source: 'billing', target: 'finance-permission', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e11', source: 'invoice', target: 'finance-permission', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e12', source: 'refund', target: 'finance-permission', label: 'USES', type: 'USES' } },
    { data: { id: 'e13', source: 'payments', target: 'payment-automation', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e14', source: 'payments', target: 'tempo', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e15', source: 'payments', target: 'scriptrunner', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e16', source: 'billing', target: 'tempo', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e17', source: 'invoice', target: 'assets', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e18', source: 'alice', target: 'finance-team', label: 'MEMBER_OF', type: 'MEMBER_OF' } },
    { data: { id: 'e19', source: 'finance-team', target: 'payments', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e20', source: 'finance-team', target: 'billing', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e21', source: 'finance-team', target: 'invoice', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e22', source: 'payments', target: 'billing', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e23', source: 'billing', target: 'invoice', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e24', source: 'invoice', target: 'refund', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e25', source: 'compliance', target: 'finance-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e26', source: 'compliance', target: 'finance-permission', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e27', source: 'payments', target: 'security', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e28', source: 'platform', target: 'payments', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e29', source: 'security', target: 'scriptrunner', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e30', source: 'hr', target: 'assets', label: 'REFERENCES', type: 'REFERENCES' } },

    { data: { id: 'e31', source: 'hr', target: 'hr-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e32', source: 'recruitment', target: 'hr-workflow', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e33', source: 'learning', target: 'hr-workflow', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e34', source: 'hr', target: 'hr-board', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e35', source: 'hr', target: 'hr-filter', label: 'USES', type: 'USES' } },
    { data: { id: 'e36', source: 'hr', target: 'hr-permission', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e37', source: 'recruitment', target: 'hr-permission', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e38', source: 'learning', target: 'hr-permission', label: 'USES', type: 'USES' } },
    { data: { id: 'e39', source: 'hr', target: 'hr-automation', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e40', source: 'bob', target: 'hr-team', label: 'MEMBER_OF', type: 'MEMBER_OF' } },
    { data: { id: 'e41', source: 'hr-team', target: 'hr', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e42', source: 'hr-team', target: 'recruitment', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e43', source: 'onboarding', target: 'hr-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e44', source: 'onboarding', target: 'hr-board', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e45', source: 'hr', target: 'security', label: 'REFERENCES', type: 'REFERENCES' } },

    { data: { id: 'e46', source: 'platform', target: 'engineering-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e47', source: 'security', target: 'engineering-workflow', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e48', source: 'platform', target: 'engineering-board', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e49', source: 'engineering-board', target: 'engineering-filter', label: 'USES', type: 'USES' } },
    { data: { id: 'e50', source: 'platform', target: 'engineering-permission', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e51', source: 'security', target: 'engineering-permission', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e52', source: 'platform', target: 'platform-automation', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e53', source: 'charlie', target: 'eng-team', label: 'MEMBER_OF', type: 'MEMBER_OF' } },
    { data: { id: 'e54', source: 'eng-team', target: 'platform', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e55', source: 'eng-team', target: 'security', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e56', source: 'devops', target: 'engineering-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e57', source: 'devops', target: 'engineering-board', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e58', source: 'platform', target: 'payments', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e59', source: 'security', target: 'payments', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },

    { data: { id: 'e60', source: 'marketing', target: 'marketing-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e61', source: 'sales', target: 'marketing-workflow', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e62', source: 'marketing', target: 'marketing-board', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e63', source: 'marketing-board', target: 'marketing-filter', label: 'USES', type: 'USES' } },
    { data: { id: 'e64', source: 'marketing', target: 'marketing-permission', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e65', source: 'sales', target: 'marketing-permission', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e66', source: 'marketing', target: 'marketing-automation', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e67', source: 'diana', target: 'marketing-team', label: 'MEMBER_OF', type: 'MEMBER_OF' } },
    { data: { id: 'e68', source: 'marketing-team', target: 'marketing', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e69', source: 'marketing-team', target: 'sales', label: 'OWNED_BY', type: 'OWNED_BY' } },
    { data: { id: 'e70', source: 'customer-success', target: 'marketing-workflow', label: 'USES', type: 'USES' } },
    { data: { id: 'e71', source: 'customer-success', target: 'marketing-board', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e72', source: 'marketing', target: 'sales', label: 'DEPENDS_ON', type: 'DEPENDS_ON' } },
    { data: { id: 'e73', source: 'sales', target: 'billing', label: 'REFERENCES', type: 'REFERENCES' } },
    { data: { id: 'e74', source: 'marketing', target: 'security', label: 'CONNECTED_TO', type: 'CONNECTED_TO' } },
    { data: { id: 'e75', source: 'platform', target: 'marketing', label: 'REFERENCES', type: 'REFERENCES' } }
];

function normalizeGraphData(nodes, edges) {
    const normalizeNode = (node) => {
        const payload = node && node.data ? node.data : node;
        return {
            ...node,
            data: {
                id: payload.id || payload.ID || node?.id || '',
                label: payload.label || payload.name || payload.id || '',
                type: payload.type || node?.type || 'Project',
                risk: payload.risk || node?.risk || 'Medium',
                cluster: payload.cluster || node?.cluster || '',
                summary: payload.summary || payload.description || '',
                owner: payload.owner || '',
                cloudReady: payload.cloudReady ?? payload.cloud_ready ?? 0,
                migrationRecommendation: payload.migrationRecommendation || payload.migration_recommendation || '',
                relatedObjects: payload.relatedObjects || payload.related_objects || []
            }
        };
    };

    const normalizeEdge = (edge) => {
        const payload = edge && edge.data ? edge.data : edge;
        return {
            ...edge,
            data: {
                id: payload.id || edge?.id || '',
                source: payload.source || edge?.source || '',
                target: payload.target || edge?.target || '',
                label: payload.label || edge?.label || 'RELATED',
                type: payload.type || edge?.type || 'RELATED'
            }
        };
    };

    return {
        nodes: Array.isArray(nodes) ? nodes.map(normalizeNode) : [],
        edges: Array.isArray(edges) ? edges.map(normalizeEdge) : []
    };
}

async function loadGraph() {
    try {
        const nodesResponse = await fetch('data/nodes.json');
        const edgesResponse = await fetch('data/edges.json');

        if (!nodesResponse.ok || !edgesResponse.ok) {
            throw new Error('Unable to load static data');
        }

        const parsed = normalizeGraphData(await nodesResponse.json(), await edgesResponse.json());
        graphNodes = parsed.nodes;
        graphEdges = parsed.edges;
    } catch (error) {
        graphNodes = normalizeGraphData(fallbackNodes, fallbackEdges).nodes;
        graphEdges = normalizeGraphData(fallbackNodes, fallbackEdges).edges;
    }

    initialiseGraph(graphNodes, graphEdges);
    renderMetrics(graphNodes, graphEdges);
    renderProjectList(graphNodes);
    renderClusterCards(graphNodes);
    renderClusterList(graphNodes);
    focusNode('payments');
}

function initialiseGraph(nodes, edges) {
    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [...nodes, ...edges],
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(label)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'font-size': 10,
                    'color': '#172B4D',
                    'background-color': '#0052CC',
                    'width': 42,
                    'height': 42,
                    'border-width': 2,
                    'border-color': '#FFFFFF',
                    'text-wrap': 'wrap',
                    'text-max-width': '80px'
                }
            },
            {
                selector: 'node[type="Project"]',
                style: {
                    'background-color': '#0052CC',
                    'shape': 'roundrectangle',
                    'width': 70,
                    'height': 40
                }
            },
            {
                selector: 'node[type="Workflow"]',
                style: { 'background-color': '#FF991F' }
            },
            {
                selector: 'node[type="Board"]',
                style: { 'background-color': '#36B37E' }
            },
            {
                selector: 'node[type="Filter"]',
                style: { 'background-color': '#6554C0' }
            },
            {
                selector: 'node[type="PermissionScheme"]',
                style: { 'background-color': '#5E4DB2' }
            },
            {
                selector: 'node[type="Automation"]',
                style: { 'background-color': '#FF5630' }
            },
            {
                selector: 'node[type="MarketplaceApp"]',
                style: { 'background-color': '#00B8D9' }
            },
            {
                selector: 'node[type="Group"]',
                style: { 'background-color': '#8C94A3', 'shape': 'roundrectangle' }
            },
            {
                selector: 'node[type="User"]',
                style: { 'background-color': '#F2C94C', 'shape': 'ellipse' }
            },
            {
                selector: 'edge',
                style: {
                    'curve-style': 'bezier',
                    'width': 1.75,
                    'line-color': '#A5ADBA',
                    'target-arrow-color': '#A5ADBA',
                    'target-arrow-shape': 'triangle',
                    'label': 'data(label)',
                    'font-size': 8,
                    'color': '#5E6C84',
                    'text-rotation': 'autorotate',
                    'text-background-color': '#FFFFFF',
                    'text-background-padding': '2px'
                }
            },
            {
                selector: '.highlight',
                style: {
                    'background-color': '#FF5630',
                    'line-color': '#FF5630',
                    'target-arrow-color': '#FF5630',
                    'transition-duration': '0.2s'
                }
            },
            {
                selector: '.faded',
                style: { 'opacity': 0.16 }
            }
        ],
        layout: {
            name: 'preset',
            fit: true,
            padding: 80,
            animate: false
        }
    });

    registerEvents();
}

function registerEvents() {
    cy.on('tap', 'node', (evt) => {
        const node = evt.target;
        focusNode(node.id(), true);
    });

    cy.on('tap', (event) => {
        if (event.target === cy) {
            clearHighlight();
            document.getElementById('detailsPanel').innerHTML = '<p>Select a node to inspect its structure and readiness.</p>';
            state.selectedNodeId = null;
        }
    });
}

function focusNode(nodeId, center = true) {
    clearHighlight();
    const node = cy.getElementById(nodeId);

    if (!node || node.length === 0) {
        return;
    }

    node.addClass('highlight');
    node.connectedEdges().addClass('highlight');
    node.neighborhood().addClass('highlight');
    cy.elements().difference(node.closedNeighborhood()).addClass('faded');

    state.selectedNodeId = nodeId;
    showDetails(node);

    if (center) {
        cy.animate({
            center: { eles: node },
            zoom: 1.2,
            duration: 500
        });
    }
}

function clearHighlight() {
    cy.elements().removeClass('highlight');
    cy.elements().removeClass('faded');
}

function showDetails(node) {
    const data = node.data();
    const related = (data.relatedObjects || []).map((item) => `<span class="tag">${item}</span>`).join('');
    const dependencies = node.connectedEdges().length;

    document.getElementById('detailsPanel').innerHTML = `
        <div class="detail-card">
            <span class="badge ${data.risk.toLowerCase()}">${data.risk}</span>
            <h3>${data.label}</h3>
            <p>${data.summary}</p>
        </div>
        <div class="detail-card">
            <div class="info-row"><span class="info-label">Type</span><span class="info-value">${data.type}</span></div>
            <div class="info-row"><span class="info-label">Owner</span><span class="info-value">${data.owner || 'N/A'}</span></div>
            <div class="info-row"><span class="info-label">Dependencies</span><span class="info-value">${dependencies}</span></div>
            <div class="info-row"><span class="info-label">Cloud Ready</span><span class="info-value">${data.cloudReady || 0}%</span></div>
            <div class="progress-row">
                <small>Migration readiness</small>
                <div class="progress-bar"><div class="progress-fill" style="width: ${data.cloudReady || 0}%"></div></div>
            </div>
        </div>
        <div class="detail-card">
            <h3>Related Objects</h3>
            <div class="tag-list">${related || '<span class="tag">No related objects</span>'}</div>
        </div>
        <div class="detail-card">
            <h3>Migration Recommendation</h3>
            <p>${data.migrationRecommendation || 'Plan and validate after dependency review.'}</p>
        </div>
    `;
}

function renderMetrics(nodes, edges) {
    const projects = nodes.filter((node) => node.data.type === 'Project').length;
    const boards = nodes.filter((node) => node.data.type === 'Board').length;
    const filters = nodes.filter((node) => node.data.type === 'Filter').length;
    const workflows = nodes.filter((node) => node.data.type === 'Workflow').length;
    const apps = nodes.filter((node) => node.data.type === 'MarketplaceApp').length;
    const relationships = edges.length;
    const health = Math.round((projects * 4 + boards * 3 + filters * 2 + workflows * 2 + apps * 1 + relationships / 2) / 12);

    document.getElementById('metricProjects').textContent = projects;
    document.getElementById('metricBoards').textContent = boards;
    document.getElementById('metricFilters').textContent = filters;
    document.getElementById('metricWorkflows').textContent = workflows;
    document.getElementById('metricApps').textContent = apps;
    document.getElementById('metricRelationships').textContent = relationships;

    document.querySelector('.header-badge').textContent = `Health ${health}% • Migration Ready`;
}

function renderProjectList(nodes) {
    const list = document.getElementById('projectList');
    const query = document.getElementById('search').value.trim().toLowerCase();

    list.innerHTML = '';
    const projects = nodes.filter((node) => node.data.type === 'Project' && node.data.label.toLowerCase().includes(query));

    if (!projects.length) {
        const empty = document.createElement('li');
        empty.textContent = 'No matching projects';
        list.appendChild(empty);
        return;
    }

    projects.forEach((project) => {
        const item = document.createElement('li');
        item.textContent = project.data.label;
        item.dataset.nodeId = project.data.id;

        if (state.selectedNodeId === project.data.id) {
            item.classList.add('active');
        }

        item.addEventListener('click', () => {
            focusNode(project.data.id);
        });

        list.appendChild(item);
    });
}

function renderClusterCards(nodes) {
    const cards = document.getElementById('clusterCards');
    const clusters = [
        { id: 'finance', name: 'Finance', description: 'Payments, billing and control planes', risk: 'High', ready: 76 },
        { id: 'hr', name: 'HR', description: 'Employee services and people operations', risk: 'Low', ready: 87 },
        { id: 'engineering', name: 'Engineering', description: 'Platform, security and delivery ops', risk: 'Medium', ready: 76 },
        { id: 'marketing', name: 'Marketing', description: 'Campaigns, sales and customer success', risk: 'Low', ready: 84 }
    ];

    cards.innerHTML = clusters.map((cluster) => {
        const items = nodes.filter((node) => node.data.cluster === cluster.id);
        const projects = items.filter((node) => node.data.type === 'Project').length;
        const deps = items.filter((node) => node.data.type !== 'User' && node.data.type !== 'Group').length;
        return `
            <button class="cluster-card" data-cluster="${cluster.id}">
                <h4>${cluster.name}</h4>
                <p>${cluster.description}</p>
                <div class="cluster-meta">
                    <span>${projects} projects</span>
                    <span>${cluster.ready}% ready</span>
                </div>
                <div class="cluster-meta">
                    <span>${cluster.risk} risk</span>
                    <span>${deps} dependencies</span>
                </div>
            </button>
        `;
    }).join('');

    cards.querySelectorAll('.cluster-card').forEach((button) => {
        button.addEventListener('click', () => focusCluster(button.dataset.cluster));
    });
}

function renderClusterList(nodes) {
    const list = document.getElementById('clusterList');
    const clusters = [
        { id: 'finance', name: 'Finance', count: nodes.filter((node) => node.data.cluster === 'finance').length },
        { id: 'hr', name: 'HR', count: nodes.filter((node) => node.data.cluster === 'hr').length },
        { id: 'engineering', name: 'Engineering', count: nodes.filter((node) => node.data.cluster === 'engineering').length },
        { id: 'marketing', name: 'Marketing', count: nodes.filter((node) => node.data.cluster === 'marketing').length }
    ];

    list.innerHTML = '';
    clusters.forEach((cluster) => {
        const button = document.createElement('button');
        button.textContent = `${cluster.name} (${cluster.count})`;
        button.addEventListener('click', () => focusCluster(cluster.id));
        list.appendChild(button);
    });
}

function focusCluster(clusterId) {
    const clusterNodes = cy.nodes().filter((node) => node.data('cluster') === clusterId);
    if (clusterNodes.length === 0) {
        return;
    }

    clearHighlight();
    clusterNodes.addClass('highlight');
    clusterNodes.connectedEdges().addClass('highlight');
    cy.animate({
        fit: { eles: clusterNodes, padding: 70 },
        duration: 600
    });
    state.activeCluster = clusterId;
}

function handleSearch(event) {
    const value = event.target.value.trim().toLowerCase();
    renderProjectList(graphNodes);

    if (!value) {
        clearHighlight();
        return;
    }

    const match = graphNodes.find((node) => node.data.type === 'Project' && node.data.label.toLowerCase().includes(value));
    if (match) {
        focusNode(match.data.id, true);
    }
}

document.getElementById('search').addEventListener('input', handleSearch);

document.addEventListener('DOMContentLoaded', () => {
    loadGraph();
});
