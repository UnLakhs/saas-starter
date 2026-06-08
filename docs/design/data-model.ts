// Users, Workspaces, Clients, Contacts, Obligations, Deadlines, Documents, Notes, Activity Logs

// User: Οι χρήστες που θα συνδέονται στην εφαρμογή.
export type User = {
  id: string;

  email: string;
  passwordHash: string;

  firstName: string; 
  lastName: string; 

  phone?: string;
  avatarUrl?: string; // Ίσως για φωτογραφία προφίλ στο app.

  emailVerifiedAt?: Date;
  lastLoginAt?: Date; // Πότε έκανε τελευταία φορά login. Ίσως χρήσιμο για ασφάλεια/analytics.

  isActive: boolean; // Αν ο χρήστης είναι ενεργός ή έχει απενεργοποιηθεί.

  createdAt: Date; // Πότε δημιουργήθηκε ο χρήστης.
  updatedAt: Date; // Πότε άλλαξαν τελευταία φορά τα στοιχεία του χρήστη.
};

// Workspace: Το λογιστικό γραφείο.
export type Workspace = {
  id: string;

  name: string; // ΠΧ Papadopoulos Accounting Office.

  // Slug για routing τύπου: /logistika-grafeia/papadopoulos-accounting-office/dashboard
  // Χρήσιμο αν κάνουμε multi-workspace routing.
  slug?: string; // URL-friendly μοναδικό όνομα. Ίσως το φτιάχνουμε αυτόματα από το name, πχ "papadopoulos-accounting-office".

  email?: string; // Email επικοινωνίας του γραφείου.
  phone?: string; // Τηλέφωνο γραφείου.
  address?: string; // Διεύθυνση του γραφείου.
  website?: string; // Ιστοσελίδα του γραφείου, ίσως όχι απαραίτητο για MVP.

  // Στοιχεία που ίσως χρειαστούν αν κάνουμε συνδρομητικό billing ή επαγγελματικά exports στο μέλλον.
  taxId?: string; // ΑΦΜ του λογιστικού γραφείου.
  taxOffice?: string; // ΔΟΥ του λογιστικού γραφείου.

  createdAt: Date; // Πότε δημιουργήθηκε το workspace.
  updatedAt: Date; // Πότε άλλαξαν τελευταία φορά τα στοιχεία του workspace.
};

// WorkspaceMember: Συνδέει users με workspaces. Χωρίς αυτό, ένας χρήστης θα μπορούσε να ανήκει μόνο σε ένα γραφείο.
export type WorkspaceMember = {
  id: string;

  workspaceId: string; // Δείχνει σε ποιο workspace/γραφείο ανήκει το μέλος.
  userId: string; // Δείχνει ποιος User είναι μέλος.

  role: "OWNER" | "ADMIN" | "ACCOUNTANT" | "ASSISTANT" | "VIEWER"; // Ρόλος/δικαιώματα του μέλους μέσα στο γραφείο.

  invitedByUserId?: string; // Ποιος κάλεσε το μέλος στο γραφείο. Χρήσιμο για ιστορικό.
  joinedAt?: Date; // Πότε αποδέχτηκε την πρόσκληση ή πότε έγινε ενεργό μέλος.

  isActive: boolean; // Αν το μέλος είναι ακόμα ενεργό στο workspace.

  createdAt: Date; // Πότε δημιουργήθηκε η εγγραφή συμμετοχής.
  updatedAt: Date; // Πότε άλλαξε τελευταία φορά η συμμετοχή, πχ role ή active status.
};

// Client: Ο πελάτης του λογιστικού γραφείου. Μπορεί να είναι φυσικό πρόσωπο ή επιχείρηση.
export type Client = {
  id: string;
  workspaceId: string; // Σε ποιο λογιστικό γραφείο ανήκει ο πελάτης.

  type: "INDIVIDUAL" | "BUSINESS"; // Αν είναι φυσικό πρόσωπο ή επιχείρηση.
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED"; // Κατάσταση πελάτη μέσα στο γραφείο.

  displayName: string; // Όνομα που θα φαίνεται στο UI. ΠΧ "Γιώργος Παπαδόπουλος"
  legalName?: string; // Επίσημο όνομα/επωνυμία, αν διαφέρει από το displayName.

  email?: string; // Βασικό email επικοινωνίας του πελάτη.
  phone?: string; // Σταθερό τηλέφωνο.
  mobile?: string; // Κινητό τηλέφωνο.

  addressLine1?: string; // Βασική διεύθυνση.
  addressLine2?: string; // Συμπληρωματική διεύθυνση, πχ όροφος.
  city?: string; // Πόλη.
  postalCode?: string; // Ταχυδρομικός κώδικας.
  country: string; // Χώρα. Μπορεί να έχει default "GR".

  notes?: string; // Γενικές σημειώσεις πάνω στον πελάτη.

  assignedUserId?: string; // Ποιος λογιστής/χρήστης είναι υπεύθυνος για τον πελάτη.

  createdAt: Date; // Πότε δημιουργήθηκε ο πελάτης.
  updatedAt: Date; // Πότε άλλαξαν τελευταία φορά τα στοιχεία του πελάτη.
};

// TaxProfile: Τα φορολογικά στοιχεία του πελάτη. Ξεχωριστά για να μη φουσκώσει το Client.

//ΑΥΤΟ ΤΟ ΕΔΩΣΕ ΟΛΟ ΤΟ ΤΣΑΤ!!!
export type TaxProfile = {
  id: string;
  clientId: string; // Σε ποιον πελάτη ανήκουν αυτά τα φορολογικά στοιχεία.

  afm: string; // ΑΦΜ πελάτη.
  taxOffice?: string; // ΔΟΥ πελάτη.

  amka?: string; // ΑΜΚΑ, κυρίως για φυσικά πρόσωπα.
  gemi?: string; // ΓΕΜΗ, κυρίως για επιχειρήσεις.

  kadPrimary?: string; // Κύριος ΚΑΔ.
  kadSecondary?: string[]; // Δευτερεύοντες ΚΑΔ, αν υπάρχουν.

  profession?: string; // Επάγγελμα/δραστηριότητα πελάτη.
  legalForm:
    | "INDIVIDUAL"
    | "SOLE_PROPRIETORSHIP"
    | "OE"
    | "EE"
    | "IKE"
    | "EPE"
    | "AE"
    | "OTHER"; // Νομική μορφή πελάτη.

  vatRegime?: "NORMAL" | "EXEMPT" | "SMALL_BUSINESS" | "OTHER"; // Καθεστώς ΦΠΑ.
  bookkeepingType?: "NONE" | "SIMPLE" | "DOUBLE_ENTRY"; // Τύπος βιβλίων.

  taxResidenceCountry?: string; // Φορολογική κατοικία, συνήθως "GR".

  taxisUsername?: string; // Username για Taxisnet, αν αποφασίσουμε να αποθηκεύεται.
  taxisPasswordEncrypted?: string; // Κρυπτογραφημένος κωδικός Taxisnet, ποτέ plain text.

  efkaUsername?: string; // Username για EFKA, αν χρειαστεί.
  efkaPasswordEncrypted?: string; // Κρυπτογραφημένος κωδικός EFKA.

  erganiUsername?: string; // Username για Εργάνη, κυρίως για payroll/εργατικά.
  erganiPasswordEncrypted?: string; // Κρυπτογραφημένος κωδικός Εργάνη.

  createdAt: Date; // Πότε δημιουργήθηκε το φορολογικό προφίλ.
  updatedAt: Date; // Πότε άλλαξαν τελευταία φορά τα φορολογικά στοιχεία.
};

// ClientContact: Πρόσωπα επικοινωνίας ενός πελάτη. Χρήσιμο κυρίως όταν ο πελάτης είναι εταιρεία.
export type ClientContact = {
  id: string;
  clientId: string; // Σε ποιον πελάτη ανήκει αυτή η επαφή.

  firstName: string; // Όνομα επαφής.
  lastName: string; // Επώνυμο επαφής.

  role?: string; // Ρόλος στην εταιρεία. ΠΧ Owner, Manager, HR, Accounting.
  email?: string; // Email επαφής.
  phone?: string; // Σταθερό τηλέφωνο επαφής.
  mobile?: string; // Κινητό επαφής.

  isPrimary: boolean; // Αν είναι η βασική επαφή του πελάτη.
  receivesNotifications: boolean; // Αν θα λαμβάνει reminders/emails από το σύστημα.

  createdAt: Date; // Πότε δημιουργήθηκε η επαφή.
  updatedAt: Date; // Πότε άλλαξαν τελευταία φορά τα στοιχεία της επαφής.
};

// Obligation: Μια γενική λογιστική υποχρέωση πελάτη, πχ ΦΠΑ, myDATA, μισθοδοσία.

//ΚΑΙ ΑΥΤΟ ΤΟ ΕΔΩΣΕ ΤΟ ΤΣΑΤ!!
export type Obligation = {
  id: string;
  clientId: string; // Σε ποιον πελάτη ανήκει η υποχρέωση.

  type:
    | "VAT"
    | "INCOME_TAX"
    | "PAYROLL"
    | "MYDATA"
    | "WITHHOLDING_TAX"
    | "INSURANCE"
    | "COMPANY_REGISTRY"
    | "ANNUAL_FINANCIAL_STATEMENTS"
    | "TAX_CERTIFICATE"
    | "OTHER"; // Είδος λογιστικής υποχρέωσης.

  title: string; // Τίτλος που φαίνεται στο UI. ΠΧ "Υποβολή ΦΠΑ".
  description?: string; // Προαιρετική περιγραφή/οδηγίες για την υποχρέωση.

  frequency: "ONCE" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM"; // Κάθε πότε επαναλαμβάνεται.

  isActive: boolean; // Αν η υποχρέωση ισχύει ακόμα για τον πελάτη.

  defaultPriority: "LOW" | "NORMAL" | "HIGH" | "URGENT"; // Default προτεραιότητα για deadlines που θα βγαίνουν από αυτή την υποχρέωση.

  startDate?: Date; // Από πότε ξεκινάει να ισχύει η υποχρέωση.
  endDate?: Date; // Πότε σταματάει να ισχύει, αν έχει λήξη.

  createdAt: Date; // Πότε δημιουργήθηκε η υποχρέωση.
  updatedAt: Date; // Πότε άλλαξε τελευταία φορά η υποχρέωση.
};

// Deadline: Συγκεκριμένη ημερομηνία/εργασία που πρέπει να γίνει για έναν πελάτη.
export type Deadline = {
  id: string;

  workspaceId: string; // Σε ποιο λογιστικό γραφείο ανήκει το deadline.
  clientId: string; // Για ποιον πελάτη είναι το deadline.
  obligationId?: string; // Από ποια γενική υποχρέωση προκύπτει, αν υπάρχει.

  title: string; // Τίτλος deadline. ΠΧ "Υποβολή ΦΠΑ Q1".
  description?: string; // Προαιρετικές λεπτομέρειες για το τι πρέπει να γίνει.

  dueDate: Date; // Ημερομηνία λήξης.

  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "OVERDUE"; // Κατάσταση deadline.
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT"; // Προτεραιότητα deadline.

  assignedUserId?: string; // Ποιος χρήστης/λογιστής είναι υπεύθυνος.

  completedAt?: Date; // Πότε ολοκληρώθηκε.
  completedByUserId?: string; // Ποιος χρήστης το ολοκλήρωσε.

  reminderAt?: Date; // Πότε πρέπει να σταλεί υπενθύμιση.
  reminderSentAt?: Date; // Πότε στάλθηκε τελικά η υπενθύμιση.

  createdAt: Date; // Πότε δημιουργήθηκε το deadline.
  updatedAt: Date; // Πότε άλλαξε τελευταία φορά το deadline.
};

// Document: Αρχείο που σχετίζεται με έναν πελάτη, πχ δήλωση, τιμολόγιο, ταυτότητα.

//ΤΣΑΤ!!! 
export type Document = {
  id: string; // Μοναδικό τεχνικό id του αρχείου.

  workspaceId: string; // Σε ποιο λογιστικό γραφείο ανήκει το αρχείο.
  clientId: string; // Σε ποιον πελάτη ανήκει το αρχείο.
  uploadedByUserId: string; // Ποιος χρήστης ανέβασε το αρχείο.

  name: string; // Όνομα αρχείου όπως θα φαίνεται στο UI.
  description?: string; // Προαιρετική περιγραφή του αρχείου.

  fileUrl: string; // URL από όπου μπορεί να φορτωθεί/κατέβει το αρχείο.
  fileKey: string; // Storage key στον provider, χρήσιμο για delete/replace.

  mimeType: string; // Τύπος αρχείου, πχ application/pdf.
  sizeInBytes: number; // Μέγεθος αρχείου σε bytes.

  category:
    | "TAX_RETURN"
    | "VAT"
    | "PAYROLL"
    | "INVOICE"
    | "CONTRACT"
    | "CERTIFICATE"
    | "IDENTITY"
    | "BALANCE_SHEET"
    | "MYDATA"
    | "OTHER"; // Κατηγορία αρχείου για οργάνωση και φίλτρα.

  year?: number; // Έτος που αφορά το αρχείο, πχ 2026.
  period?: string; // Περίοδος που αφορά, πχ "Q1", "January", "2026".

  createdAt: Date; // Πότε ανέβηκε/δημιουργήθηκε το αρχείο.
  updatedAt: Date; // Πότε άλλαξαν τελευταία φορά τα metadata του αρχείου.
};

// Note: Εσωτερική σημείωση για έναν πελάτη.
export type Note = {
  id: string;

  workspaceId: string; // Σε ποιο λογιστικό γραφείο ανήκει η σημείωση.
  clientId: string; // Σε ποιον πελάτη αφορά η σημείωση.
  authorId: string; // Ποιος χρήστης έγραψε τη σημείωση.

  title?: string; // Προαιρετικός τίτλος σημείωσης.
  body: string; // Το βασικό περιεχόμενο της σημείωσης.

  visibility: "PRIVATE" | "WORKSPACE"; // Αν τη βλέπει μόνο ο author ή όλο το workspace.

  createdAt: Date; // Πότε δημιουργήθηκε η σημείωση.
  updatedAt: Date; // Πότε άλλαξε τελευταία φορά η σημείωση.
};

// ActivityLog: Ιστορικό ενεργειών μέσα στο σύστημα.
export type ActivityLog = {
  id: string;

  workspaceId: string; // Σε ποιο λογιστικό γραφείο έγινε η ενέργεια.
  clientId?: string; // Σε ποιον πελάτη αφορά, αν αφορά συγκεκριμένο πελάτη.
  actorId?: string; // Ποιος χρήστης έκανε την ενέργεια, αν υπάρχει.

  action:
    | "CLIENT_CREATED"
    | "CLIENT_UPDATED"
    | "CLIENT_ARCHIVED"
    | "DEADLINE_CREATED"
    | "DEADLINE_COMPLETED"
    | "DOCUMENT_UPLOADED"
    | "NOTE_CREATED"
    | "USER_INVITED"; // Τύπος ενέργειας για φίλτρα, audit και timeline.

  message: string; // Ανθρώπινο μήνυμα που μπορεί να εμφανιστεί στο UI.

  metadata?: Record<string, unknown>; // Extra structured στοιχεία, πχ παλιό/νέο status.

  createdAt: Date; // Πότε έγινε η ενέργεια.
};
