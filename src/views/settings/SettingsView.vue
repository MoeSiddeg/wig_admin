<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import BaseCard from '@/components/ui/BaseCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Globe,
  Shield,
  FileText,
  X,
  Save,
  HelpCircle,
  Info
} from 'lucide-vue-next'

const { t } = useLocale()

// Social Media State
const socialMediaAccounts = ref([
  {
    id: 1,
    nameEn: 'Facebook',
    nameAr: 'فيسبوك',
    url: 'https://facebook.com/example',
    icon: 'https://example.com/facebook-icon.png',
    isActive: true
  },
  {
    id: 2,
    nameEn: 'Twitter',
    nameAr: 'تويتر',
    url: 'https://twitter.com/example',
    icon: 'https://example.com/twitter-icon.png',
    isActive: true
  },
  {
    id: 3,
    nameEn: 'Instagram',
    nameAr: 'انستغرام',
    url: 'https://instagram.com/example',
    icon: 'https://example.com/instagram-icon.png',
    isActive: false
  }
])

// Privacy Policy State
const privacyPolicy = ref({
  contentEn: `This Privacy Policy describes how we collect, use, and protect your information when you use our services.

1. Information We Collect
- Personal information you provide directly
- Information collected automatically
- Information from third-party sources

2. How We Use Your Information
- To provide and maintain our service
- To notify you about changes
- To provide customer support

3. Information Security
- We implement appropriate security measures
- Data encryption and secure storage
- Regular security reviews

4. Your Rights
- Access to your personal information
- Correction of inaccurate information
- Deletion of your personal information`,
  contentAr: `تصف سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحماية معلوماتك عند استخدامك لخدماتنا.

1. المعلومات التي نجمعها
- المعلومات الشخصية التي تقدمها مباشرة
- المعلومات التي يتم جمعها تلقائيًا
- المعلومات من مصادر الطرف الثالث

2. كيف نستخدم معلوماتك
- لتقديم وصيانة خدمتنا
- لإعلامك بالتغييرات
- لتقديم خدمة العملاء

3. أمان المعلومات
- ننفذ تدابير أمنية مناسبة
- تشفير البيانات والتخزين الآمن
- مراجعات أمنية منتظمة

4. حقوقك
- الوصول إلى معلوماتك الشخصية
- تصحيح المعلومات غير الدقيقة
- حذف معلوماتك الشخصية`
})

// Terms and Conditions State
const termsAndConditions = ref({
  contentEn: `These Terms and Conditions govern your use of our services.

1. Acceptance of Terms
By using our service, you agree to these terms.

2. Use of Service
- You must be at least 18 years old
- You must provide accurate information
- You must not use the service for illegal purposes

3. User Accounts
- You are responsible for your account
- You must keep your password secure
- You must notify us of unauthorized use

4. Intellectual Property
- All content is owned by us or our licensors
- You may not use our content without permission
- You retain rights to your own content

5. Limitation of Liability
- Our service is provided "as is"
- We are not liable for any damages
- Your use is at your own risk`,
  contentAr: `تنظم هذه الشروط والأحكام استخدامك لخدماتنا.

1. قبول الشروط
باستخدام خدمتنا، فإنك توافق على هذه الشروط.

2. استخدام الخدمة
- يجب أن تكون على الأقل 18 عامًا
- يجب أن تقدم معلومات دقيقة
- يجب عدم استخدام الخدمة لأغراض غير قانونية

3. حسابات المستخدمين
- أنت مسؤول عن حسابك
- يجب أن تحافظ على كلمة المرور الخاصة بك آمنة
- يجب إعلامنا بالاستخدام غير المصرح به

4. الملكية الفكرية
- جميع المحتوى مملوك لنا أو لمرخصينا
- قد لا تستخدم محتوانا دون إذن
- تحتفظ بالحقوق في محتواك الخاص

5. تحديد المسؤولية
- خدمتنا مقدمة "كما هي"
- نحن لسنا مسؤولين عن أي أضرار
- استخدامك على مسؤوليتك الخاصة`
})

// FAQ State
const faqItems = ref([
  {
    id: 1,
    questionEn: 'What is WFG?',
    questionAr: 'ما هو WFG؟',
    answerEn: 'WFG is a comprehensive sports management platform that helps organizations manage tournaments, teams, and events efficiently.',
    answerAr: 'WFG هي منصة إدارة رياضية شاملة تساعد المؤسسات على إدارة البطولات والفرق والفعاليات بكفاءة.'
  },
  {
    id: 2,
    questionEn: 'How do I register for an event?',
    questionAr: 'كيف أقوم بالتسجيل في فعالية؟',
    answerEn: 'You can register for events through our user portal by browsing available events and completing the registration form.',
    answerAr: 'يمكنك التسجيل في الفعاليات من خلال بوابة المستخدم الخاصة بنا عن طريق تصفح الفعاليات المتاحة وإكمال نموذج التسجيل.'
  },
  {
    id: 3,
    questionEn: 'What payment methods are accepted?',
    questionAr: 'ما هي طرق الدفع المقبولة؟',
    answerEn: 'We accept all major credit cards, debit cards, and online payment methods including PayPal and Stripe.',
    answerAr: 'نقبل جميع بطاقات الائتمان الرئيسية وبطاقات الخصم وطرق الدفع عبر الإنترنت بما في ذلك PayPal و Stripe.'
  }
])

// About WFG State
const aboutWfg = ref({
  contentEn: `Welcome to WFG - World Fitness Games

WFG is a premier sports management platform dedicated to organizing and promoting athletic competitions worldwide. Our mission is to provide athletes, coaches, and sports organizations with the tools they need to succeed.

Our Story
Founded in 2020, WFG has grown from a small local tournament organizer to a global platform serving thousands of athletes and organizations. We believe in the power of sports to bring people together and create positive change in communities.

What We Do
- Organize professional sports tournaments
- Provide comprehensive athlete management
- Offer training and development programs
- Connect sports communities globally

Our Values
- Excellence: We strive for the highest standards in everything we do
- Integrity: We operate with transparency and honesty
- Community: We build strong, supportive sports communities
- Innovation: We continuously improve our platform and services

Join us in our mission to make sports accessible and enjoyable for everyone!`,
  contentAr: `مرحباً بك في WFG - World Fitness Games

WFG هي منصة إدارة رياضية رائدة مكرسة لتنظيم وترويج المسابقات الرياضية في جميع أنحاء العالم. مهمتنا هي تزويد الرياضيين والمدربين والمؤسسات الرياضية بالأدوات التي يحتاجونها للنجاح.

قصتنا
تأسست WFG في عام 2020، ونمت من منظم بطولات محلي صغير إلى منصة عالمية تخدم آلاف الرياضيين والمؤسسات. نؤمن بقوة الرياضة في جمع الناس معاً وإحداث تغيير إيجابي في المجتمعات.

ماذا نفعل
- تنظيم بطولات رياضية احترافية
- توفير إدارة شاملة للرياضيين
- تقديم برامج التدريب والتطوير
- ربط المجتمعات الرياضية عالمياً

قيمنا
- التميز: نسعى إلى أعلى المعايير في كل ما نفعل
- النزاهة: نعمل بالشفافية والأمانة
- المجتمع: نبني مجتمعات رياضية قوية وداعمة
- الابتكار: نحسن منصتنا وخدماتنا باستمرار

انضم إلينا في مهمتنا لجعل الرياضات متاحة وممتعة للجميع!`
})

// Modal States
const showSocialModal = ref(false)
const showPrivacyModal = ref(false)
const showTermsModal = ref(false)
const showFaqModal = ref(false)
const showAboutModal = ref(false)
const editingSocial = ref(null)
const editingFaq = ref(null)

// Form State
const socialForm = ref({
  nameEn: '',
  nameAr: '',
  url: '',
  icon: '',
  isActive: true
})

const faqForm = ref({
  questionEn: '',
  questionAr: '',
  answerEn: '',
  answerAr: ''
})

// Computed
const activeSocialAccounts = computed(() => 
  socialMediaAccounts.value.filter(account => account.isActive)
)

// Methods
const openAddSocialModal = () => {
  editingSocial.value = null
  socialForm.value = {
    nameEn: '',
    nameAr: '',
    url: '',
    icon: '',
    isActive: true
  }
  showSocialModal.value = true
}

const openEditSocialModal = (social) => {
  editingSocial.value = social
  socialForm.value = { ...social }
  showSocialModal.value = true
}

const saveSocialMedia = () => {
  if (editingSocial.value) {
    const index = socialMediaAccounts.value.findIndex(s => s.id === editingSocial.value.id)
    socialMediaAccounts.value[index] = { ...socialForm.value, id: editingSocial.value.id }
  } else {
    socialMediaAccounts.value.push({
      ...socialForm.value,
      id: Date.now()
    })
  }
  closeSocialModal()
}

const deleteSocialMedia = (social) => {
  if (confirm(`Are you sure you want to delete ${social.name}?`)) {
    socialMediaAccounts.value = socialMediaAccounts.value.filter(s => s.id !== social.id)
  }
}

const toggleSocialVisibility = (social) => {
  social.isActive = !social.isActive
}

const closeSocialModal = () => {
  showSocialModal.value = false
  editingSocial.value = null
  socialForm.value = {
    nameEn: '',
    nameAr: '',
    url: '',
    icon: '',
    isActive: true
  }
}

const openPrivacyModal = () => {
  showPrivacyModal.value = true
}

const savePrivacyPolicy = () => {
  showPrivacyModal.value = false
  // Show success message
}

const openTermsModal = () => {
  showTermsModal.value = true
}

const saveTermsAndConditions = () => {
  showTermsModal.value = false
  // Show success message
}

// FAQ Methods
const openAddFaqModal = () => {
  editingFaq.value = null
  faqForm.value = {
    questionEn: '',
    questionAr: '',
    answerEn: '',
    answerAr: ''
  }
  showFaqModal.value = true
}

const openEditFaqModal = (faq) => {
  editingFaq.value = faq
  faqForm.value = { ...faq }
  showFaqModal.value = true
}

const saveFaq = () => {
  if (editingFaq.value) {
    const index = faqItems.value.findIndex(f => f.id === editingFaq.value.id)
    faqItems.value[index] = { ...faqForm.value, id: editingFaq.value.id }
  } else {
    faqItems.value.push({
      ...faqForm.value,
      id: Date.now()
    })
  }
  closeFaqModal()
}

const deleteFaq = (faq) => {
  if (confirm(`Are you sure you want to delete this FAQ item?`)) {
    faqItems.value = faqItems.value.filter(f => f.id !== faq.id)
  }
}

const closeFaqModal = () => {
  showFaqModal.value = false
  editingFaq.value = null
  faqForm.value = {
    questionEn: '',
    questionAr: '',
    answerEn: '',
    answerAr: ''
  }
}

// About WFG Methods
const openAboutModal = () => {
  showAboutModal.value = true
}

const saveAboutWfg = () => {
  showAboutModal.value = false
  // Show success message
}
</script>

<template>
  <section class="settings-view">
    <!-- Header -->
    <div class="settings-header">
      <div class="header-content">
        <div class="header-text">
          <h1>{{ t('settings.title') }}</h1>
          <p>{{ t('settings.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Social Media Section -->
    <BaseCard class="social-media-section">
      <template #header>
        <div class="section-header">
          <div class="section-title">
            <Globe :size="24" />
            <h2>{{ t('settings.socialMedia') }}</h2>
          </div>
          <AppButton @click="openAddSocialModal" class="add-btn">
            <Plus :size="20" />
            {{ t('settings.addSocialMedia') }}
          </AppButton>
        </div>
      </template>

      <div class="social-media-grid">
        <div 
          v-for="social in socialMediaAccounts" 
          :key="social.id"
          class="social-card"
          :class="{ inactive: !social.isActive }"
        >
          <div class="social-header">
            <div class="social-info">
              <img 
                v-if="social.icon" 
                :src="social.icon" 
                :alt="social.name"
                class="social-icon"
              />
              <div class="social-details">
                <h3>{{ social.name }}</h3>
                <a 
                  :href="social.url" 
                  target="_blank" 
                  class="social-url"
                >
                  {{ social.url }}
                  <ExternalLink :size="14" />
                </a>
              </div>
            </div>
            <BaseBadge 
              :color="social.isActive ? 'green' : 'gray'"
              class="status-badge"
            >
              {{ social.isActive ? t('settings.active') : t('settings.inactive') }}
            </BaseBadge>
          </div>
          
          <div class="social-actions">
            <AppButton 
              variant="secondary" 
              size="sm" 
              @click="openEditSocialModal(social)"
              class="action-btn"
            >
              <Edit2 :size="16" />
              {{ t('settings.edit') }}
            </AppButton>
            <AppButton 
              variant="secondary" 
              size="sm" 
              @click="toggleSocialVisibility(social)"
              class="action-btn"
            >
              <EyeOff v-if="social.isActive" :size="16" />
              <Eye v-else :size="16" />
              {{ social.isActive ? t('settings.hide') : t('settings.show') }}
            </AppButton>
            <AppButton 
              variant="danger" 
              size="sm" 
              @click="deleteSocialMedia(social)"
              class="action-btn"
            >
              <Trash2 :size="16" />
              {{ t('settings.delete') }}
            </AppButton>
          </div>
        </div>
      </div>

      <div v-if="socialMediaAccounts.length === 0" class="empty-state">
        <Globe :size="48" />
        <h3>{{ t('settings.noSocialMedia') }}</h3>
        <p>{{ t('settings.noSocialMediaMessage') }}</p>
        <AppButton @click="openAddSocialModal">
          <Plus :size="20" />
          {{ t('settings.addSocialMedia') }}
        </AppButton>
      </div>
    </BaseCard>

    <!-- Privacy Policy Section -->
    <BaseCard class="privacy-section">
      <template #header>
        <div class="section-header">
          <div class="section-title">
            <Shield :size="24" />
            <h2>{{ t('settings.privacyPolicy') }}</h2>
          </div>
          <AppButton @click="openPrivacyModal" class="edit-btn">
            <Edit2 :size="20" />
            {{ t('settings.editPrivacyPolicy') }}
          </AppButton>
        </div>
      </template>

      <div class="policy-content">
        <div class="policy-preview">
          <h3>{{ t('settings.privacyPolicyContent') }}</h3>
          <div class="policy-text">
            {{ privacyPolicy.content.substring(0, 300) }}...
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Terms and Conditions Section -->
    <BaseCard class="terms-section">
      <template #header>
        <div class="section-header">
          <div class="section-title">
            <FileText :size="24" />
            <h2>{{ t('settings.termsAndConditions') }}</h2>
          </div>
          <AppButton @click="openTermsModal" class="edit-btn">
            <Edit2 :size="20" />
            {{ t('settings.editTermsAndConditions') }}
          </AppButton>
        </div>
      </template>

      <div class="terms-content">
        <div class="terms-preview">
          <h3>{{ t('settings.termsContent') }}</h3>
          <div class="terms-text">
            {{ termsAndConditions.content.substring(0, 300) }}...
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- FAQ Section -->
    <BaseCard class="faq-section">
      <template #header>
        <div class="section-header">
          <div class="section-title">
            <HelpCircle :size="24" />
            <h2>{{ t('settings.faq') }}</h2>
          </div>
          <AppButton @click="openAddFaqModal" class="add-btn">
            <Plus :size="20" />
            {{ t('settings.addFaq') }}
          </AppButton>
        </div>
      </template>

      <div class="faq-list">
        <div 
          v-for="faq in faqItems" 
          :key="faq.id"
          class="faq-item"
        >
          <div class="faq-content">
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
            </div>
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
          
          <div class="faq-actions">
            <AppButton 
              variant="secondary" 
              size="sm" 
              @click="openEditFaqModal(faq)"
              class="action-btn"
            >
              <Edit2 :size="16" />
              {{ t('settings.edit') }}
            </AppButton>
            <AppButton 
              variant="danger" 
              size="sm" 
              @click="deleteFaq(faq)"
              class="action-btn"
            >
              <Trash2 :size="16" />
              {{ t('settings.delete') }}
            </AppButton>
          </div>
        </div>
      </div>

      <div v-if="faqItems.length === 0" class="empty-state">
        <HelpCircle :size="48" />
        <h3>{{ t('settings.noFaq') }}</h3>
        <p>{{ t('settings.noFaqMessage') }}</p>
        <AppButton @click="openAddFaqModal">
          <Plus :size="20" />
          {{ t('settings.addFaq') }}
        </AppButton>
      </div>
    </BaseCard>

    <!-- About WFG Section -->
    <BaseCard class="about-section">
      <template #header>
        <div class="section-header">
          <div class="section-title">
            <Info :size="24" />
            <h2>{{ t('settings.aboutWfg') }}</h2>
          </div>
          <AppButton @click="openAboutModal" class="edit-btn">
            <Edit2 :size="20" />
            {{ t('settings.editAboutWfg') }}
          </AppButton>
        </div>
      </template>

      <div class="about-content">
        <div class="about-preview">
          <h3>{{ t('settings.aboutContent') }}</h3>
          <div class="about-text">
            {{ aboutWfg.content.substring(0, 300) }}...
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Social Media Modal -->
    <div v-if="showSocialModal" class="modal-overlay" @click="closeSocialModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingSocial ? t('settings.editSocialMedia') : t('settings.addSocialMedia') }}</h2>
          <button @click="closeSocialModal" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-grid">
            <AppInput 
              v-model="socialForm.name" 
              :label="t('settings.socialMediaName')"
              :placeholder="t('settings.socialMediaName')"
            />
            <AppInput 
              v-model="socialForm.url" 
              :label="t('settings.socialMediaUrl')"
              :placeholder="t('settings.socialMediaUrl')"
            />
            <AppInput 
              v-model="socialForm.icon" 
              :label="t('settings.socialMediaIcon')"
              :placeholder="t('settings.socialMediaIcon')"
            />
          </div>
        </div>

        <div class="modal-actions">
          <AppButton variant="secondary" @click="closeSocialModal">
            {{ t('settings.cancel') }}
          </AppButton>
          <AppButton @click="saveSocialMedia">
            <Save :size="16" />
            {{ t('settings.save') }}
          </AppButton>
        </div>
      </div>
    </div>

    <!-- Privacy Policy Modal -->
    <div v-if="showPrivacyModal" class="modal-overlay" @click="() => showPrivacyModal = false">
      <div class="modal-content large-modal" @click.stop>
        <div class="modal-header">
          <h2>{{ t('settings.editPrivacyPolicy') }}</h2>
          <button @click="() => showPrivacyModal = false" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        
        <div class="modal-body">
          <textarea 
            v-model="privacyPolicy.content"
            class="content-editor"
            rows="20"
            :placeholder="t('settings.privacyPolicyContent')"
          />
        </div>

        <div class="modal-actions">
          <AppButton variant="secondary" @click="() => showPrivacyModal = false">
            {{ t('settings.cancel') }}
          </AppButton>
          <AppButton @click="savePrivacyPolicy">
            <Save :size="16" />
            {{ t('settings.save') }}
          </AppButton>
        </div>
      </div>
    </div>

    <!-- Terms and Conditions Modal -->
    <div v-if="showTermsModal" class="modal-overlay" @click="() => showTermsModal = false">
      <div class="modal-content large-modal" @click.stop>
        <div class="modal-header">
          <h2>{{ t('settings.editTermsAndConditions') }}</h2>
          <button @click="() => showTermsModal = false" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        
        <div class="modal-body">
          <textarea 
            v-model="termsAndConditions.content"
            class="content-editor"
            rows="20"
            :placeholder="t('settings.termsContent')"
          />
        </div>

        <div class="modal-actions">
          <AppButton variant="secondary" @click="() => showTermsModal = false">
            {{ t('settings.cancel') }}
          </AppButton>
          <AppButton @click="saveTermsAndConditions">
            <Save :size="16" />
            {{ t('settings.save') }}
          </AppButton>
        </div>
      </div>
    </div>

    <!-- FAQ Modal -->
    <div v-if="showFaqModal" class="modal-overlay" @click="closeFaqModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingFaq ? t('settings.editFaq') : t('settings.addFaq') }}</h2>
          <button @click="closeFaqModal" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-grid">
            <AppInput 
              v-model="faqForm.question" 
              :label="t('settings.question')"
              :placeholder="t('settings.question')"
            />
            <div class="form-group">
              <label>{{ t('settings.answer') }}</label>
              <textarea 
                v-model="faqForm.answer"
                class="answer-editor"
                rows="6"
                :placeholder="t('settings.answer')"
              />
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <AppButton variant="secondary" @click="closeFaqModal">
            {{ t('settings.cancel') }}
          </AppButton>
          <AppButton @click="saveFaq">
            <Save :size="16" />
            {{ t('settings.save') }}
          </AppButton>
        </div>
      </div>
    </div>

    <!-- About WFG Modal -->
    <div v-if="showAboutModal" class="modal-overlay" @click="() => showAboutModal = false">
      <div class="modal-content large-modal" @click.stop>
        <div class="modal-header">
          <h2>{{ t('settings.editAboutWfg') }}</h2>
          <button @click="() => showAboutModal = false" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        
        <div class="modal-body">
          <textarea 
            v-model="aboutWfg.content"
            class="content-editor"
            rows="20"
            :placeholder="t('settings.aboutContent')"
          />
        </div>

        <div class="modal-actions">
          <AppButton variant="secondary" @click="() => showAboutModal = false">
            {{ t('settings.cancel') }}
          </AppButton>
          <AppButton @click="saveAboutWfg">
            <Save :size="16" />
            {{ t('settings.save') }}
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

/* Header */
.settings-header {
  margin-bottom: 2rem;
}

.header-content {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-text h1 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.header-text p {
  font-size: 1rem;
  color: var(--color-text-medium);
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin: 0;
}

.add-btn, .edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Social Media Grid */
.social-media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.social-card {
  border: 1px solid var(--color-border);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.social-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.social-card.inactive {
  opacity: 0.6;
  background: var(--color-surface-variant);
}

.social-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.social-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.social-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--color-surface-variant);
}

.social-details h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.social-url {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.875rem;
  word-break: break-all;
}

.social-url:hover {
  text-decoration: underline;
}

.status-badge {
  font-size: 0.75rem;
  font-weight: 500;
}

.social-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 80px;
  justify-content: center;
  font-size: 0.875rem;
  padding: 0.5rem;
}

/* Policy and Terms Sections */
.policy-content, .terms-content {
  padding: 1.5rem;
}

.policy-preview, .terms-preview {
  background: var(--color-surface-variant);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.policy-preview h3, .terms-preview h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
}

.policy-text, .terms-text {
  color: var(--color-text-medium);
  line-height: 1.6;
  white-space: pre-wrap;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-medium);
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 2rem;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.large-modal {
  max-width: 900px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-white);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.close-btn:active {
  transform: scale(0.95);
  background: rgba(239, 68, 68, 0.2);
}

.modal-body {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
}

.content-editor {
  width: 100%;
  min-height: 400px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.6;
  resize: vertical;
}

.content-editor:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* FAQ Section */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 1px solid var(--color-border);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.faq-item:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.faq-content {
  margin-bottom: 1rem;
}

.faq-question h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
}

.faq-answer p {
  color: var(--color-text-medium);
  line-height: 1.6;
  margin: 0;
}

.faq-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* About Section */
.about-content {
  padding: 1.5rem;
}

.about-preview {
  background: var(--color-surface-variant);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.about-preview h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
}

.about-text {
  color: var(--color-text-medium);
  line-height: 1.6;
  white-space: pre-wrap;
}

/* Form Styles */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-dark);
}

.answer-editor {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.6;
  resize: vertical;
}

.answer-editor:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .settings-view {
    padding: 1rem;
  }
  
  .social-media-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 1.5rem;
  }
  
  .header-text h1 {
    font-size: 1.75rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .social-media-grid {
    grid-template-columns: 1fr;
  }
  
  .social-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .social-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
}

@media (max-width: 480px) {
  .settings-view {
    padding: 0.5rem;
  }
  
  .header-content {
    padding: 1rem;
  }
  
  .header-text h1 {
    font-size: 1.5rem;
  }
  
  .social-card {
    padding: 1rem;
  }
  
  .social-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-actions {
    padding: 1rem;
    flex-direction: column;
  }
}
</style>
