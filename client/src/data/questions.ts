export interface Question {
  id: string;
  category: "fundamentals" | "client-scripting" | "server-scripting" | "security" | "data-handling" | "performance" | "deployment" | "hackathon";
  difficulty: "beginner" | "intermediate" | "advanced";
  question: string;
  answer: string;
  keyPoints?: string[];
  relatedTopics?: string[];
}

export const questions: Question[] = [
  {
    id: "q1",
    category: "fundamentals",
    difficulty: "beginner",
    question: "What is ServiceNow, and how does it differ from traditional web applications?",
    answer: "ServiceNow is a cloud-based, low-code enterprise workflow platform built on a single data model using tables. Unlike traditional web applications, it provides out-of-the-box ITSM (IT Service Management), HR, CSM (Customer Service Management), GRC (Governance, Risk & Compliance), and custom app capabilities. Developers extend functionality using configuration first and code second, enforcing upgrade-safe development practices. The platform's architecture emphasizes scalability and maintainability.",
    keyPoints: ["Cloud-based platform", "Low-code development", "Single data model", "Out-of-the-box modules", "Configuration-first approach"],
    relatedTopics: ["Application Scope", "Table Structure", "Upgrade Safety"]
  },
  {
    id: "q2",
    category: "fundamentals",
    difficulty: "beginner",
    question: "What is an application scope, and why is it important?",
    answer: "Application scope controls modular development in ServiceNow. There are two main types: Global scope (accessible across the platform) and Scoped applications (isolated and safer). Scope controls table access, Script Include visibility, and API exposure. Scoped apps are safer for upgrades and reuse because they prevent unintended cross-application dependencies. Understanding cross-scope access policies is critical for real-world scenarios.",
    keyPoints: ["Global scope", "Scoped applications", "Table access control", "API exposure", "Upgrade safety"],
    relatedTopics: ["Custom Applications", "Script Includes", "Security"]
  },
  {
    id: "q3",
    category: "fundamentals",
    difficulty: "intermediate",
    question: "Explain the ServiceNow table structure and inheritance model",
    answer: "ServiceNow uses base tables (Task, CMDB tables) that can be extended through table inheritance. Child tables inherit shared fields from parent tables. Extending the Task table is common practice. Inheritance impacts business rules, ACLs, and reporting. Understanding inheritance is essential for performance optimization and proper data modeling.",
    keyPoints: ["Base tables", "Table inheritance", "Field inheritance", "Task table extension", "Performance impact"],
    relatedTopics: ["Database Design", "Business Rules", "ACLs"]
  },
  {
    id: "q4",
    category: "client-scripting",
    difficulty: "beginner",
    question: "What are Client Scripts, and when should they be used?",
    answer: "Client Scripts run in the browser and improve user experience through validation, UI changes, and form behavior. They should NOT be used for data integrity enforcement. Main types include: onLoad (executes when form loads), onChange (executes when field value changes), onSubmit (executes before form submission), and onCellEdit (executes when list cell is edited).",
    keyPoints: ["Browser execution", "User experience", "Form validation", "UI changes", "Multiple event types"],
    relatedTopics: ["UI Policies", "GlideAjax", "Form Behavior"]
  },
  {
    id: "q5",
    category: "client-scripting",
    difficulty: "intermediate",
    question: "Difference between Client Script and UI Policy",
    answer: "UI Policies are declarative (configuration-based) while Client Scripts are imperative (code-based). UI Policies are generally preferred for maintainability and performance. Client Scripts are necessary when complex conditional logic is required. Best practice: Use UI Policies first; resort to Client Scripts only when unavoidable.",
    keyPoints: ["Declarative vs imperative", "Maintainability", "Performance", "Conditional logic", "Best practices"],
    relatedTopics: ["Client Scripts", "Form Configuration", "Performance Optimization"]
  },
  {
    id: "q6",
    category: "client-scripting",
    difficulty: "intermediate",
    question: "How does GlideAjax work?",
    answer: "GlideAjax bridges client and server communication. Client scripts cannot directly access the database, so GlideAjax makes asynchronous calls to Script Includes on the server. The Script Include must be marked as 'Client Callable' to be accessible via GlideAjax. This asynchronous pattern is essential for maintaining responsive user interfaces.",
    keyPoints: ["Client-server bridge", "Asynchronous calls", "Script Includes", "Client Callable", "Responsive UI"],
    relatedTopics: ["Client Scripts", "Script Includes", "Asynchronous Processing"]
  },
  {
    id: "q7",
    category: "server-scripting",
    difficulty: "intermediate",
    question: "What are Business Rules, and how do you decide when to use them?",
    answer: "Business Rules are server-side scripts that execute automatically when records are inserted, updated, deleted, queried, or displayed. Execution timings include: Before (executes before database transaction), After (executes after database transaction), Async (executes asynchronously without blocking user), and Display (executes when record is displayed). Use cases vary by timing. Avoid unnecessary Business Rules as they impact system performance.",
    keyPoints: ["Server-side execution", "Automatic triggers", "Multiple timing options", "Performance impact", "Record lifecycle"],
    relatedTopics: ["Script Includes", "Flow Designer", "Performance Optimization"]
  },
  {
    id: "q8",
    category: "server-scripting",
    difficulty: "advanced",
    question: "Difference between Business Rules, Script Includes, and Flow Designer",
    answer: "Business Rules handle record lifecycle logic with automatic execution. Script Includes provide reusable, modular logic accessible across the platform. Flow Designer offers event-driven workflows with a visual interface. Architectural decision-making should consider: when code is preferable to flows, when flows reduce technical debt, and appropriate usage patterns for each.",
    keyPoints: ["Business Rules", "Script Includes", "Flow Designer", "Architectural decisions", "Code vs configuration"],
    relatedTopics: ["Server-Side Scripting", "Workflow Automation", "Code Reusability"]
  },
  {
    id: "q9",
    category: "server-scripting",
    difficulty: "intermediate",
    question: "What is a Script Include, and how do you design one properly?",
    answer: "Script Includes are reusable server-side scripts that store common functions and logic. Key design principles include: Purpose (reduce code duplication and improve maintainability), Reusability (accessible from Client Scripts if marked Client Callable, Business Rules, and workflows), Encapsulation (use proper access modifiers and naming conventions), and Performance (consider caching and optimization).",
    keyPoints: ["Reusable logic", "Code organization", "Client Callable", "Encapsulation", "Performance optimization"],
    relatedTopics: ["Client Scripts", "Business Rules", "Code Best Practices"]
  },
  {
    id: "q10",
    category: "server-scripting",
    difficulty: "advanced",
    question: "Explain synchronous vs asynchronous Business Rules",
    answer: "Synchronous rules execute immediately and block user interaction until complete. Asynchronous rules execute in the background without blocking. Async rules are preferred for long-running operations to maintain user experience. Understanding transaction processing is critical for proper implementation.",
    keyPoints: ["Synchronous execution", "Asynchronous execution", "User blocking", "Long-running operations", "Transaction processing"],
    relatedTopics: ["Business Rules", "Performance", "User Experience"]
  },
  {
    id: "q11",
    category: "security",
    difficulty: "intermediate",
    question: "What are ACLs, and how do they work?",
    answer: "Access Control Lists (ACLs) control user access and permissions at field, record, and table levels. ACL rules determine whether users can read, write, delete, or create records based on conditions, scripts, and roles. Evaluation order: Table.None → Table.Field → Record.None → Record.Field. ACLs are server-side enforced and cannot be bypassed.",
    keyPoints: ["Access control", "Field-level security", "Record-level security", "Role-based access", "Server-side enforcement"],
    relatedTopics: ["Security Best Practices", "UI Policies", "User Administration"]
  },
  {
    id: "q12",
    category: "security",
    difficulty: "intermediate",
    question: "Difference between ACLs and UI Policies",
    answer: "UI Policies control visibility (user interface restrictions), while ACLs control access (security enforcement). Critical distinction: UI restrictions can be bypassed through developer tools, but ACLs are enforced server-side and cannot be circumvented. Always use ACLs for security-critical restrictions.",
    keyPoints: ["Visibility vs access", "UI restrictions", "Security enforcement", "Server-side control", "Best practices"],
    relatedTopics: ["ACLs", "Security", "UI Configuration"]
  },
  {
    id: "q13",
    category: "data-handling",
    difficulty: "intermediate",
    question: "What is GlideRecord, and how is it used?",
    answer: "GlideRecord is an abstraction layer for database operations. It enables CRUD (Create, Read, Update, Delete) operations, query building, and encoded queries. Common pitfalls to avoid include: queries inside loops (N+1 problem), not limiting results, and ignoring database indexes.",
    keyPoints: ["Database abstraction", "CRUD operations", "Query building", "Performance pitfalls", "Index usage"],
    relatedTopics: ["Database Queries", "Performance Optimization", "Data Integrity"]
  },
  {
    id: "q14",
    category: "data-handling",
    difficulty: "advanced",
    question: "What are REST APIs in ServiceNow, and how have you used them?",
    answer: "REST APIs enable integration with external systems. Types include: Inbound REST (external systems call ServiceNow), Outbound REST (ServiceNow calls external systems), and Scripted REST APIs (custom endpoints for specific business logic). Critical considerations include authentication methods, error handling, payload validation, and real-world integration patterns.",
    keyPoints: ["REST integration", "Inbound/outbound APIs", "Custom endpoints", "Authentication", "Error handling"],
    relatedTopics: ["Integrations", "External Systems", "API Security"]
  },
  {
    id: "q15",
    category: "performance",
    difficulty: "advanced",
    question: "How do you optimize performance in ServiceNow?",
    answer: "Performance optimization strategies include: avoiding unnecessary Business Rules, using asynchronous processing for long operations, optimizing queries (use indexes, limit results), using Script Includes to avoid code duplication, minimizing client-server round trips, and profiling and monitoring system performance.",
    keyPoints: ["Query optimization", "Async processing", "Code reusability", "Index usage", "Monitoring"],
    relatedTopics: ["Database Performance", "Best Practices", "System Monitoring"]
  },
  {
    id: "q16",
    category: "performance",
    difficulty: "advanced",
    question: "How do you debug issues in ServiceNow?",
    answer: "Debugging tools and techniques include: Background Scripts (execute scripts in isolation), Logs (system logs and application logs), Script Debugger (step through code execution), gs.log() and gs.info() (add logging to scripts), and System Diagnostics (monitor system health). Methodical debugging approaches are preferred over trial-and-error.",
    keyPoints: ["Debugging tools", "Logging", "Script execution", "System diagnostics", "Methodical approach"],
    relatedTopics: ["Troubleshooting", "Best Practices", "System Monitoring"]
  },
  {
    id: "q17",
    category: "deployment",
    difficulty: "intermediate",
    question: "What are Update Sets, and what are their limitations?",
    answer: "Update Sets track and capture changes made in ServiceNow instances, enabling migration between environments. Limitations include: not all customizations are captured, manual conflict resolution may be required, and application repository or CI/CD may be preferable for complex scenarios.",
    keyPoints: ["Change tracking", "Environment migration", "Customization capture", "Conflict resolution", "CI/CD alternatives"],
    relatedTopics: ["Deployment", "Change Management", "Version Control"]
  },
  {
    id: "q18",
    category: "deployment",
    difficulty: "advanced",
    question: "How do you handle conflicts during deployment?",
    answer: "Conflict resolution strategies include: previewing issues before deployment, understanding skipped records, manual resolution of conflicting changes, testing after deployment, and implementing a rollback strategy for failed deployments.",
    keyPoints: ["Preview deployment", "Conflict resolution", "Testing", "Rollback strategy", "Risk management"],
    relatedTopics: ["Update Sets", "Deployment", "Change Management"]
  },
  {
    id: "q19",
    category: "hackathon",
    difficulty: "advanced",
    question: "Custom Service Portal Widget Design - Real Hackathon Question",
    answer: "Create a custom Service Portal widget that shows data from a GlideRecord query with dynamic filters based on the logged-in user, allows inline editing of records without page refresh, validates fields on the client side before saving, and works on both desktop and mobile. Widget Architecture: Server Script (GlideRecord query, filter by gs.getUserID()), Client Controller (AngularJS, fetch data using spUtil.get() or $http.post), Template (HTML, display results in table/list with ng-repeat). Inline Editing: Use ng-model bindings for fields, call custom widget server script via $sp.saveRecord() or $http.post on change. Client-Side Validation: AngularJS form validation (ng-required, regex patterns), block update if invalid, show error toast. Mobile Responsiveness: Use Bootstrap grid (col-xs-*, col-sm-*), Service Portal CSS framework, avoid fixed widths, test with responsive preview. Summary Flow: Server script gets user data → Client controller binds → HTML displays/edits → Inline update with $http.post → Angular validation → Responsive Bootstrap for mobile.",
    keyPoints: ["Service Portal", "GlideRecord", "AngularJS", "Inline editing", "Responsive design", "Client validation"],
    relatedTopics: ["Service Portal", "Custom Widgets", "User Experience"]
  }
];

export const categories = [
  { id: "fundamentals", label: "Fundamentals", icon: "BookOpen", color: "blue" },
  { id: "client-scripting", label: "Client Scripting", icon: "Code", color: "purple" },
  { id: "server-scripting", label: "Server Scripting", icon: "Server", color: "orange" },
  { id: "security", label: "Security & Access", icon: "Lock", color: "red" },
  { id: "data-handling", label: "Data & APIs", icon: "Database", color: "green" },
  { id: "performance", label: "Performance", icon: "Zap", color: "yellow" },
  { id: "deployment", label: "Deployment", icon: "Rocket", color: "indigo" },
  { id: "hackathon", label: "Hackathon", icon: "Trophy", color: "pink" }
];

export const difficulties = [
  { id: "beginner", label: "Beginner", color: "green" },
  { id: "intermediate", label: "Intermediate", color: "yellow" },
  { id: "advanced", label: "Advanced", color: "red" }
];
