import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    auth: {
      welcomeBack: 'Welcome back',
      loginSubtitle: 'Enter your credentials to access the admin panel',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign in',
      createAccount: 'Create your account',
      registerSubtitle: 'Start managing the platform with a new admin profile',
      name: 'Name',
      confirmPassword: 'Confirm password',
      register: 'Create account',
    },
    nav: {
      home: 'Home',
      map: 'Map',
      sports: 'Sports',
      users: 'Users',
      settings: 'Settings',
      dashboard: 'Dashboard',
      messages: 'Messages',
    },
    common: {
      welcome: 'Welcome',
      logout: 'Logout',
      loading: 'Loading',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      close: 'Close',
    },
    sports: {
      title: 'Sports Management',
      subtitle: 'Manage sports competitions and events',
      addSport: 'Add Sport',
      editSport: 'Edit Sport',
      deleteSport: 'Delete Sport',
      viewDetails: 'View Details',
      showHidden: 'Show hidden',
      searchPlaceholder: 'Search sports...',
      noSports: 'No sports found',
      noSportsMessage: 'Start by adding your first sport competition',
      loading: 'Loading sports...',
      
      // Form fields
      basicInfo: 'Basic Information',
      sportName: 'Sport Name',
      imageUrl: 'Image URL',
      competitionDetails: 'Competition Details',
      venue: 'Venue',
      dateOfEvent: 'Date of Event',
      competition: 'Competition',
      numberOfCompetitors: 'Number of Competitors',
      numberOfTeams: 'Number of Teams',
      competitionDays: 'Competition Days',
      governingBody: 'Governing Body',
      rulesAndRegulations: 'Rules and Regulations',
      addRule: 'Add Rule',
      enterRule: 'Enter rule',
      
      // Status
      visible: 'Visible',
      hidden: 'Hidden',
      status: 'Status',
      
      // Details
      sportDetails: 'Sport Details',
      name: 'Name',
      organization: 'Organization',
      competitors: 'Competitors',
      teams: 'Teams',
      days: 'Days',
      
      // Actions
      hide: 'Hide',
      show: 'Show',
      update: 'Update Sport',
      create: 'Add Sport'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage application settings and configurations',
      
      // Social Media
      socialMedia: 'Social Media',
      addSocialMedia: 'Add Social Media',
      editSocialMedia: 'Edit Social Media',
      deleteSocialMedia: 'Delete Social Media',
      socialMediaName: 'Platform Name',
      socialMediaUrl: 'Profile URL',
      socialMediaIcon: 'Icon URL',
      noSocialMedia: 'No social media accounts added',
      noSocialMediaMessage: 'Start by adding your first social media account',
      
      // Privacy Policy
      privacyPolicy: 'Privacy Policy',
      editPrivacyPolicy: 'Edit Privacy Policy',
      privacyPolicyContent: 'Privacy Policy Content',
      privacyPolicyUpdated: 'Privacy policy updated successfully',
      
      // Terms and Conditions
      termsAndConditions: 'Terms and Conditions',
      editTermsAndConditions: 'Edit Terms and Conditions',
      termsContent: 'Terms and Conditions Content',
      termsUpdated: 'Terms and conditions updated successfully',
      
      // Status
      active: 'Active',
      inactive: 'Inactive',
      status: 'Status',
      
      // Actions
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      hide: 'Hide',
      show: 'Show',
      add: 'Add',
      update: 'Update',
      
      // Form
      name: 'Name',
      url: 'URL',
      description: 'Description',
      content: 'Content',
      
      // FAQ
      faq: 'FAQ',
      addFaq: 'Add FAQ',
      editFaq: 'Edit FAQ',
      deleteFaq: 'Delete FAQ',
      question: 'Question',
      answer: 'Answer',
      noFaq: 'No FAQ items added',
      noFaqMessage: 'Start by adding your first FAQ item',
      
      // About WFG
      aboutWfg: 'About WFG',
      editAboutWfg: 'Edit About WFG',
      aboutContent: 'About Content',
      aboutUpdated: 'About section updated successfully'
    },
    dashboard: {
      title: 'Dashboard overview',
      activeUsers: 'Active users',
      newSignups: 'New signups',
      revenue: 'Revenue',
      recentActivity: 'Recent activity',
    },
    map: {
      addMarker: 'Add Marker',
      editMarker: 'Edit Marker',
      markerType: 'Marker Type',
      hotel: 'Hotel',
      venue: 'Venue',
      title: 'Title',
      subtitle: 'Subtitle',
      venueName: 'Venue Name',
      latitude: 'Latitude',
      longitude: 'Longitude',
      imageUrl: 'Image URL',
      googleMapsUrl: 'Google Maps URL',
      reservationUrl: 'Reservation URL',
      selectLocation: 'Select Location on Map',
      addSport: 'Add Sport',
      sportName: 'Sport Name',
      sportIcon: 'Sport Icon URL',
      sportType: 'Sport Type',
      markers: 'Markers',
      hotels: 'Hotels',
      venues: 'Venues',
      noMarkers: 'No markers added yet',
      clickMap: 'Click on the map to select a location',
      titleEn: 'Title (English)',
      titleAr: 'Title (Arabic)',
      subtitleEn: 'Subtitle (English)',
      subtitleAr: 'Subtitle (Arabic)',
      venueEn: 'Venue (English)',
      venueAr: 'Venue (Arabic)',
      sportNameEn: 'Sport Name (English)',
      sportNameAr: 'Sport Name (Arabic)',
      exportData: 'Export Data',
      optional: 'Optional',
      sportTypes: {
        general: 'General Sports',
        firefighter: 'Firefighter Sports'
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with us for any inquiries, sponsorships, or volunteer opportunities',
      success: 'Your message has been sent successfully!',
      error: 'Something went wrong. Please try again.',
      submitting: 'Sending...',
      tabs: {
        message: 'Send Message',
        sponsor: 'Become Sponsor',
        volunteer: 'Volunteer'
      },
      message: {
        title: 'Send us a message',
        subtitle: 'Have a question or feedback? We\'d love to hear from you.',
        name: 'Your Name',
        email: 'Your Email',
        topic: 'Topic',
        message: 'Your Message',
        submit: 'Send Message'
      },
      sponsor: {
        title: 'Become a Sponsor',
        subtitle: 'Partner with us to support the WFG26 community.',
        email: 'Your Email',
        submit: 'Submit Inquiry'
      },
      volunteer: {
        title: 'Join as Volunteer',
        subtitle: 'Help us make WFG26 a success by volunteering your time and skills.',
        name: 'Your Name',
        email: 'Your Email',
        message: 'Tell us about yourself and how you\'d like to help',
        submit: 'Apply to Volunteer'
      }
    },
    messages: {
      title: 'Messages Management',
      subtitle: 'View and manage messages from the mobile app users',
      loading: 'Loading messages...',
      stats: {
        total: 'Total Messages',
        unread: 'Unread',
        pending: 'Pending',
        highPriority: 'High Priority'
      },
      filters: {
        title: 'Filters',
        search: 'Search messages...',
        reset: 'Reset Filters'
      },
      list: {
        title: 'Messages'
      },
      empty: {
        title: 'No messages found',
        subtitle: 'There are no messages matching your current filters.'
      },
      view: {
        title: 'Message Details',
        type: 'Type',
        name: 'Name',
        email: 'Email',
        topic: 'Topic',
        status: 'Status',
        priority: 'Priority',
        date: 'Date',
        message: 'Message',
        reply: 'Reply'
      },
      reply: {
        title: 'Reply to Message',
        to: 'To',
        message: 'Reply Message',
        send: 'Send Reply'
      }
    },
  },
  ar: {
    auth: {
      welcomeBack: 'مرحباً بعودتك',
      loginSubtitle: 'أدخل بيانات الدخول للوصول إلى لوحة التحكم',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signIn: 'تسجيل الدخول',
      createAccount: 'إنشاء حسابك',
      registerSubtitle: 'ابدأ في إدارة المنصة بملف تعريف مسؤول جديد',
      name: 'الاسم',
      confirmPassword: 'تأكيد كلمة المرور',
      register: 'إنشاء حساب',
    },
    nav: {
      home: 'الرئيسية',
      map: 'الخريطة',
      sports: 'الرياضات',
      users: 'المستخدمين',
      settings: 'الإعدادات',
      dashboard: 'لوحة التحكم',
      messages: 'الرسائل',
    },
    common: {
      welcome: 'مرحباً',
      logout: 'تسجيل الخروج',
      loading: 'جاري التحميل',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      search: 'بحث',
      close: 'إغلاق',
    },
    sports: {
      title: 'إدارة الرياضات',
      subtitle: 'إدارة المسابقات والفعاليات الرياضية',
      addSport: 'إضافة رياضة',
      editSport: 'تعديل رياضة',
      deleteSport: 'حذف رياضة',
      viewDetails: 'عرض التفاصيل',
      showHidden: 'إظهار المخفية',
      searchPlaceholder: 'البحث في الرياضات...',
      noSports: 'لم يتم العثور على رياضات',
      noSportsMessage: 'ابدأ بإضافة أول مسابقة رياضية',
      loading: 'جاري تحميل الرياضات...',
      
      // Form fields
      basicInfo: 'المعلومات الأساسية',
      sportName: 'اسم الرياضة',
      imageUrl: 'رابط الصورة',
      competitionDetails: 'تفاصيل المسابقة',
      venue: 'المكان',
      dateOfEvent: 'تاريخ الفعالية',
      competition: 'المسابقة',
      numberOfCompetitors: 'عدد المتنافسين',
      numberOfTeams: 'عدد الفرق',
      competitionDays: 'أيام المسابقة',
      governingBody: 'الهيئة الحاكمة',
      rulesAndRegulations: 'القوانين واللوائح',
      addRule: 'إضافة قانون',
      enterRule: 'أدخل القانون',
      
      // Status
      visible: 'مرئي',
      hidden: 'مخفي',
      status: 'الحالة',
      
      // Details
      sportDetails: 'تفاصيل الرياضة',
      name: 'الاسم',
      organization: 'المنظمة',
      competitors: 'المتنافسون',
      teams: 'الفرق',
      days: 'الأيام',
      
      // Actions
      hide: 'إخفاء',
      show: 'إظهار',
      update: 'تحديث الرياضة',
      create: 'إضافة الرياضة'
    },
    settings: {
      title: 'الإعدادات',
      subtitle: 'إدارة إعدادات وتكوينات التطبيق',
      
      // Social Media
      socialMedia: 'وسائل التواصل الاجتماعي',
      addSocialMedia: 'إضافة وسيلة تواصل',
      editSocialMedia: 'تعديل وسيلة تواصل',
      deleteSocialMedia: 'حذف وسيلة تواصل',
      socialMediaName: 'اسم المنصة',
      socialMediaUrl: 'رابط الملف الشخصي',
      socialMediaIcon: 'رابط الأيقونة',
      noSocialMedia: 'لم تتم إضافة حسابات وسائل تواصل',
      noSocialMediaMessage: 'ابدأ بإضافة أول حساب لوسائل التواصل الاجتماعي',
      
      // Privacy Policy
      privacyPolicy: 'سياسة الخصوصية',
      editPrivacyPolicy: 'تعديل سياسة الخصوصية',
      privacyPolicyContent: 'محتوى سياسة الخصوصية',
      privacyPolicyUpdated: 'تم تحديث سياسة الخصوصية بنجاح',
      
      // Terms and Conditions
      termsAndConditions: 'الشروط والأحكام',
      editTermsAndConditions: 'تعديل الشروط والأحكام',
      termsContent: 'محتوى الشروط والأحكام',
      termsUpdated: 'تم تحديث الشروط والأحكام بنجاح',
      
      // Status
      active: 'نشط',
      inactive: 'غير نشط',
      status: 'الحالة',
      
      // Actions
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      hide: 'إخفاء',
      show: 'إظهار',
      add: 'إضافة',
      update: 'تحديث',
      
      // Form
      name: 'الاسم',
      url: 'الرابط',
      description: 'الوصف',
      content: 'المحتوى',
      
      // FAQ
      faq: 'الأسئلة الشائعة',
      addFaq: 'إضافة سؤال',
      editFaq: 'تعديل سؤال',
      deleteFaq: 'حذف سؤال',
      question: 'السؤال',
      answer: 'الإجابة',
      noFaq: 'لم تتم إضافة أسئلة شائعة',
      noFaqMessage: 'ابدأ بإضافة أول سؤال شائع',
      
      // About WFG
      aboutWfg: 'حول WFG',
      editAboutWfg: 'تعديل حول WFG',
      aboutContent: 'محتوى حول',
      aboutUpdated: 'تم تحديث قسم حول بنجاح'
    },
    dashboard: {
      title: 'نظرة عامة على لوحة التحكم',
      activeUsers: 'المستخدمون النشطون',
      newSignups: 'التسجيلات الجديدة',
      revenue: 'الإيرادات',
      recentActivity: 'النشاط الأخير',
    },
    map: {
      addMarker: 'إضافة علامة',
      editMarker: 'تعديل العلامة',
      markerType: 'نوع العلامة',
      hotel: 'فندق',
      venue: 'مكان',
      title: 'العنوان',
      subtitle: 'العنوان الفرعي',
      venueName: 'اسم المكان',
      latitude: 'خط العرض',
      longitude: 'خط الطول',
      imageUrl: 'رابط الصورة',
      googleMapsUrl: 'رابط خرائط جوجل',
      reservationUrl: 'رابط الحجز',
      selectLocation: 'اختر الموقع على الخريطة',
      addSport: 'إضافة رياضة',
      sportName: 'اسم الرياضة',
      sportIcon: 'رابط أيقونة الرياضة',
      sportType: 'نوع الرياضة',
      markers: 'العلامات',
      hotels: 'الفنادق',
      venues: 'الأماكن',
      noMarkers: 'لم يتم إضافة علامات بعد',
      clickMap: 'انقر على الخريطة لاختيار الموقع',
      titleEn: 'العنوان (إنجليزي)',
      titleAr: 'العنوان (عربي)',
      subtitleEn: 'العنوان الفرعي (إنجليزي)',
      subtitleAr: 'العنوان الفرعي (عربي)',
      venueEn: 'المكان (إنجليزي)',
      venueAr: 'المكان (عربي)',
      sportNameEn: 'اسم الرياضة (إنجليزي)',
      sportNameAr: 'اسم الرياضة (عربي)',
      exportData: 'تصدير البيانات',
      optional: 'اختياري',
      sportTypes: {
        general: 'رياضات عامة',
        firefighter: 'رياضات رجال الإطفاء'
      },
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'تواصل معنا لأي استفسارات أو رعاية أو فرص تطوع',
      success: 'تم إرسال رسالتك بنجاح!',
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      submitting: 'جاري الإرسال...',
      tabs: {
        message: 'إرسال رسالة',
        sponsor: 'كن راعياً',
        volunteer: 'تطوع'
      },
      message: {
        title: 'أرسل لنا رسالة',
        subtitle: 'هل لديك سؤال أو ملاحظات؟ نود أن نسمع منك.',
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        topic: 'الموضوع',
        message: 'رسالتك',
        submit: 'إرسال الرسالة'
      },
      sponsor: {
        title: 'كن راعياً',
        subtitle: 'شاركنا في دعم مجتمع WFG26.',
        email: 'بريدك الإلكتروني',
        submit: 'تقديم الاستفسار'
      },
      volunteer: {
        title: 'انضم كمتطوع',
        subtitle: 'ساعدنا في نجاح WFG26 بالتطوع بوقتك ومهاراتك.',
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        message: 'أخبرنا عن نفسك وكيف تريد المساعدة',
        submit: 'التقديم كمتطوع'
      }
    },
    messages: {
      title: 'إدارة الرسائل',
      subtitle: 'عرض وإدارة الرسائل من مستخدمي التطبيق',
      loading: 'جاري تحميل الرسائل...',
      stats: {
        total: 'إجمالي الرسائل',
        unread: 'غير مقروءة',
        pending: 'في الانتظار',
        highPriority: 'أولوية عالية'
      },
      filters: {
        title: 'الفلاتر',
        search: 'البحث في الرسائل...',
        reset: 'إعادة تعيين الفلاتر'
      },
      list: {
        title: 'الرسائل'
      },
      empty: {
        title: 'لم يتم العثور على رسائل',
        subtitle: 'لا توجد رسائل تطابق الفلاتر الحالية.'
      },
      view: {
        title: 'تفاصيل الرسالة',
        type: 'النوع',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        topic: 'الموضوع',
        status: 'الحالة',
        priority: 'الأولوية',
        date: 'التاريخ',
        message: 'الرسالة',
        reply: 'رد'
      },
      reply: {
        title: 'رد على الرسالة',
        to: 'إلى',
        message: 'رسالة الرد',
        send: 'إرسال الرد'
      }
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'ar',
  fallbackLocale: 'en',
  messages,
})

export default i18n
