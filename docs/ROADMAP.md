# ClientFlow Roadmap
## Guiding Principles

- Build the MVP around the most frequent daily workflow: open dashboard, see what needs attention, update client records, add notes, and manage deadlines.
- Keep the first version simple enough to ship, but structure the data model so documents, teams, roles, and automations can be added later.
- Prioritize reliability and clarity over advanced AI features early on.
- Make the app useful for accountants, lawyers, engineers, consultants, freelancers, and small business owners without locking the product into one profession too soon.

## Phase 0: Foundation

### Frontend

- Replace the default Next.js starter page with a ClientFlow-branded app shell.
- Create the base layout: sidebar, top navigation, content area, mobile navigation.
- Define the initial design system: buttons, inputs, tables, badges, cards, modals, empty states, loading states, error states.
- Add responsive behavior for desktop, tablet, and mobile.
- Set up reusable form components with validation feedback.

### Backend

- Decide the first database provider: PostgreSQL is recommended for relational client, deadline, user, and team data.
- Add ORM/database layer, preferably Prisma or Drizzle.
- Define initial domain models: User, Customer, Deadline, Note, ActivityLog.
- Create environment configuration for database, auth, and deployment.
- Establish server-side validation with Zod.

### Infrastructure

- Configure local development database.
- Add `.env.example`.
- Add basic project documentation for setup, scripts, and environment variables.
- Confirm build, lint, and type-check commands.

### Quality

- Add basic TypeScript conventions and folder structure.
- Add smoke checks for key pages once the app shell exists.
- Keep a short architecture note in `docs/` explaining the chosen stack.

## Phase 1: MVP

### Frontend Features

- Authentication screens: sign up, login, logout, forgot password placeholder.
- Protected dashboard route.
- Dashboard overview with:
  - total customers,
  - upcoming deadlines,
  - overdue deadlines,
  - recently added customers,
  - recent activity.
- Customer list page with:
  - table view,
  - search,
  - filters,
  - sorting,
  - status badges,
  - pagination or simple page-size controls.
- Customer create/edit forms.
- Customer detail page with:
  - profile summary,
  - contact details,
  - notes,
  - deadlines,
  - activity timeline.
- Deadline management UI:
  - create,
  - edit,
  - delete,
  - mark completed,
  - overdue/upcoming/today states.
- Notes UI:
  - add note,
  - edit note,
  - delete note,
  - show note timestamps.

### Backend Features

- Authentication and protected server routes.
- CRUD APIs or Server Actions for customers.
- CRUD APIs or Server Actions for deadlines.
- CRUD APIs or Server Actions for notes.
- Activity logging for important events:
  - customer created,
  - customer updated,
  - deadline created,
  - deadline completed,
  - note added.
- Search/filter/sort support for customers.
- Deadline status calculation for upcoming, overdue, today, and completed.

### Data Model

- Customer:
  - full name,
  - email,
  - phone,
  - address,
  - company,
  - status,
  - notes summary,
  - important dates,
  - created/updated timestamps.
- Deadline:
  - title,
  - description,
  - due date,
  - priority,
  - status,
  - customer relation,
  - created/updated timestamps.
- Note:
  - body,
  - customer relation,
  - author relation,
  - created/updated timestamps.
- ActivityLog:
  - action type,
  - message,
  - related customer/deadline/note,
  - actor,
  - timestamp.

### MVP Exit Criteria

- A user can sign up, log in, and use protected pages.
- A user can create and manage customers.
- A user can attach notes and deadlines to customers.
- The dashboard accurately shows upcoming and overdue work.
- The app can be deployed and used with production environment variables.

## Phase 2: Smart Deadline Assistant

### Frontend Features

- Dedicated deadlines page with calendar/list views.
- Deadline priority indicators.
- Dashboard widgets for:
  - due today,
  - due this week,
  - overdue,
  - high priority.
- Notification preferences page.
- Reminder configuration per deadline.

### Backend Features

- Scheduled job for deadline monitoring.
- Reminder rules:
  - same-day reminder,
  - one day before,
  - one week before,
  - custom reminder offset.
- Notification records with read/unread status.
- Email reminder integration.
- Deadline recurrence support for monthly, yearly, and custom recurring obligations.

### Product Improvements

- Suggested priority based on due date and customer status.
- Deadline templates for common professional workflows.
- Quick action: "create follow-up deadline" from customer detail.

## Phase 3: Document Management

### Frontend Features

- Document upload UI per customer.
- Document list with filename, type, size, uploaded date, and category.
- Document preview/download actions.
- Document category filters.
- Empty states and upload progress states.

### Backend Features

- File storage integration with UploadThing, Cloudinary, S3, or similar.
- Secure file access rules.
- Document metadata model.
- File deletion and replacement.
- File type and size validation.

### Future Document Intelligence

- OCR extraction.
- Search inside uploaded documents.
- Automatic metadata extraction.
- AI-assisted document summaries.
- Deadline detection from document text.
- Contract and invoice field extraction.

## Phase 4: Team Collaboration

### Frontend Features

- Workspace/team settings.
- Invite team members.
- Role management UI.
- Customer ownership or assignment.
- Activity feed filtered by team member.

### Backend Features

- Workspace model.
- Membership model.
- Role-based access control.
- Invitation flow.
- Audit logs for sensitive actions.

### Roles

- Owner: full billing, settings, and data access.
- Admin: manage users and records.
- Member: manage assigned customers and tasks.
- Viewer: read-only access.

## Phase 5: Reporting & Analytics

### Frontend Features

- Reports dashboard.
- Customer growth chart.
- Deadline completion chart.
- Overdue trend chart.
- Productivity summary.
- Export buttons for CSV/PDF.

### Backend Features

- Aggregated reporting queries.
- CSV export endpoints.
- Date range filtering.
- Saved report configuration.

### Useful Reports

- Customers by status.
- Deadlines by status and priority.
- Overdue deadlines by customer.
- Monthly completed work.
- Team activity summary.

## Phase 6: Integrations & Automation

### Integrations

- Google Calendar sync.
- Outlook Calendar sync.
- Email provider integration.
- Webhook support.
- Zapier or Make integration.

### Automation Features

- Auto-create recurring deadlines.
- Auto-send reminder emails.
- Auto-tag customers based on activity.
- Auto-detect inactive customers.
- Workflow templates per profession.

## Technical Roadmap

### Recommended Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS.
- Backend: Next.js Server Actions or Route Handlers.
- Database: PostgreSQL.
- ORM: Prisma or Drizzle.
- Authentication: Auth.js or Clerk.
- Validation: Zod.
- File Storage: UploadThing, Cloudinary, or S3-compatible storage.
- Deployment: Vercel.
- Monitoring: Sentry or similar.

### Folder Structure Direction

- `app/` for routes, layouts, and page-level UI.
- `components/` for shared UI and feature components.
- `lib/` for database, auth, validation, and shared utilities.
- `server/` or `features/` for domain-specific server logic.
- `docs/` for product and architecture documentation.

### Testing Plan

- Unit tests for validation schemas and domain helpers.
- Integration tests for server actions or route handlers.
- End-to-end tests for:
  - sign up/login,
  - create customer,
  - create deadline,
  - mark deadline completed.
- Visual/manual QA for dashboard, customer table, forms, and mobile layout.

### Security Checklist

- Protect all customer, note, deadline, and document routes.
- Validate all user input server-side.
- Enforce ownership checks on every data access.
- Avoid exposing sensitive environment variables to the client.
- Add file upload restrictions before enabling document uploads.
- Add audit logging before team collaboration becomes available.

## Suggested Build Order

1. App shell and branded landing/dashboard placeholder.
2. Database setup and schema.
3. Authentication.
4. Customer CRUD.
5. Customer detail page.
6. Notes CRUD.
7. Deadline CRUD.
8. Dashboard metrics.
9. Activity logs.
10. Polish, responsive states, and deployment.
11. Smart Deadline Assistant.
12. Document uploads.
13. Team collaboration.
14. Reporting.
15. Integrations and AI-assisted document intelligence.

## Near-Term Backlog

- Choose database and ORM.
- Choose auth provider.
- Create initial database schema.
- Build app shell.
- Update metadata from "Create Next App" to "ClientFlow".
- Create dashboard placeholder.
- Create customer table prototype.
- Create customer form prototype.
- Add protected routes.
- Add first production deployment.

## Open Decisions

- PostgreSQL or MongoDB for the first production database.
- Auth.js or hosted authentication provider such as Clerk.
- Server Actions or Route Handlers as the primary backend pattern.
- UploadThing, Cloudinary, S3, or another storage provider for documents.
- Whether the first product version should support teams or only single-user accounts.
- Whether deadline reminders should start as in-app notifications only or include email from the beginning.
