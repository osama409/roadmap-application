// Roadmap Data Definition for Generative AI & Agentic AI
const ROADMAP_DATA = {
  metadata: {
    title: "Generative AI & Agentic AI Roadmap",
    subtitle: "5-Month Week-by-Week Learning & Execution Plan",
    version: "2.0",
    totalMonths: 5,
    totalWeeks: 20,
    estimatedHoursPerWeek: 17.5, // 15 to 20 hours average
    prerequisites: "Python, Data Analysis, SQL, Machine Learning, Deep Learning fundamentals, Power BI"
  },
  comparison: {
    title: "Generative AI vs. Agentic AI",
    points: [
      {
        aspect: "What it does",
        aspectAr: "ماذا يفعل؟",
        genAI: "Creates content (text, images, code) in response to a prompt.",
        genAIAr: "يولّد محتوى (نصوص، صور، كود) استجابة لأمر برومبت.",
        agenticAI: "Pursues a goal: plans steps, uses tools, checks results, continues until done.",
        agenticAIAr: "يحقق هدفاً مستقلاً: يخطط، يستخدم أدوات خارجية، يراجع النتائج، ويواصل حتى إتمام المهمة."
      },
      {
        aspect: "Interaction",
        aspectAr: "طريقة التفاعل",
        genAI: "You ask, it answers.",
        genAIAr: "أنت تسأل وهو يجيب.",
        agenticAI: "You assign a task, it acts.",
        agenticAIAr: "أنت تكلفه بمهمة وهو ينفذها ويتصرف."
      },
      {
        aspect: "Real Example",
        aspectAr: "مثال عملي",
        genAI: "'Write a reply to this customer complaint.'",
        genAIAr: "'اكتب رداً على شكوى هذا العميل.'",
        agenticAI: "'Handle today's complaints': read tickets, look up orders, reply, escalate hard cases.",
        agenticAIAr: "'تولى معالجة شكاوى اليوم': اقرأ التذاكر، ابحث في قاعدة البيانات، رد، وصعّد الحالات المعقدة."
      },
      {
        aspect: "What You Build",
        aspectAr: "ما ستبنيه عملياً",
        genAI: "RAG chatbots, document extraction, fine-tuned models.",
        genAIAr: "شات بوت RAG، استخراج بيانات من مستندات، نماذج مدربة Fine-tuned.",
        agenticAI: "Tool-using workflows, multi-step automations, multi-agent systems.",
        agenticAIAr: "مسارات عمل بأدوات خارجية، أتمتة متعددة الخطوات، وأنظمة وكلاء متعددة Multi-Agent."
      }
    ]
  },
  months: [
    {
      id: "month-1",
      number: 1,
      title: "Practical Deep Learning + NLP Foundations",
      titleAr: "الشهر الأول: أساسيات التعلم العميق ومعالجة اللغات الطبيعية (NLP)",
      description: "Get hands-on with PyTorch (not the whole course), then move into sequence models and embeddings.",
      descriptionAr: "التركيز العملي على مكتبة PyTorch، ثم الانتقال السريع لنماذج التسلسل (Sequence Models) والـ Embeddings.",
      themeColor: "#3b82f6",
      weeks: [
        {
          id: "m1-w1",
          weekNumber: 1,
          monthNumber: 1,
          title: "PyTorch Core: Tensors & Training Workflow",
          titleAr: "أساسيات PyTorch: الـ Tensors ومسار التدريب الكامل",
          estHours: 15,
          primarySource: {
            title: "PyTorch Full Course (freeCodeCamp) - Chapters 0 and 1 only",
            titleAr: "دورة PyTorch الكاملة من freeCodeCamp - الفصول 0 و 1 فقط",
            guide: "Watch 1:14:28 to 8:32:00 only (setup, tensors, workflow, training loop). Skip 0:00 to 1:14:28.",
            url: "https://www.youtube.com/watch?v=V_xro1bcAuA"
          },
          backupSource: {
            title: "PyTorch Official Tutorials: Learn the Basics",
            titleAr: "دروس PyTorch الرسمية: تعلم الأساسيات",
            guide: "A shorter, text-based route. Use it only if you want a different explanation.",
            url: "https://pytorch.org/tutorials/beginner/basics/intro.html"
          },
          tasks: [
            { id: "m1-w1-t1", text: "فهم التعامل مع الـ Tensors (إنشاؤها، أبعادها، العمليات الرياضية واستخدام GPU CUDA)", estTime: "3 ساعات" },
            { id: "m1-w1-t2", text: "فهم دورة التدريب (Training Loop): Forward pass, Loss calculation, Loss.backward(), Optimizer.step()", estTime: "4 ساعات" },
            { id: "m1-w1-t3", text: "بناء أول نموذج انحدار خطي (Linear Regression) من الصفر وحساب الـ Loss وتدريبه", estTime: "3 ساعات" },
            { id: "m1-w1-t4", text: "تطبيق كتابة الكود بنفسك بدون نسخ ولصق وحفظ النموذج واستدعاؤه (Save & Load)", estTime: "4 ساعات" }
          ],
          actionItem: "اكتب تدريب نموذج انحدار أو تصنيف بسيط في ملف Jupyter Notebook أو Google Colab وارفعه على GitHub."
        },
        {
          id: "m1-w2",
          weekNumber: 2,
          monthNumber: 1,
          title: "Neural Networks in Practice: Classification & CNN",
          titleAr: "الشبكات العصبية عملياً: التصنيف، الدوال غير الخطية، وأول CNN",
          estHours: 16,
          primarySource: {
            title: "Same PyTorch Course: Chapter 2 and CNN part of Chapter 3",
            titleAr: "نفس كورس PyTorch: الفصل الثاني وجزء الـ CNN من الفصل الثالث",
            guide: "Watch 8:32:00 to 12:42:32 and 14:22:46 to 18:44:22 (about 8.5 hours). Skip the rest for now.",
            url: "https://www.youtube.com/watch?v=V_xro1bcAuA"
          },
          backupSource: {
            title: "Neural Networks Series (3Blue1Brown)",
            titleAr: "سلسلة الشبكات العصبية من 3Blue1Brown",
            guide: "YouTube, about 1 to 1.5 hours. Watch it for backpropagation intuition.",
            url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
          },
          tasks: [
            { id: "m1-w2-t1", text: "فهم دوال التنشيط غير الخطية (ReLU, Sigmoid, Softmax) وتأثيرها على الشبكة", estTime: "3 ساعات" },
            { id: "m1-w2-t2", text: "بناء نموذج تصنيف ثنائي ومتعدد (Binary & Multi-class Classification) في PyTorch", estTime: "4 ساعات" },
            { id: "m1-w2-t3", text: "فهم طبقات الـ CNN الأساسية (Conv2d, MaxPool2d, Flatten) وتطبيقها على صور بسيطة (FashionMNIST)", estTime: "4 ساعات" },
            { id: "m1-w2-t4", text: "تقييم أداء النموذج بمقاييس الدقة (Accuracy, Confusion Matrix)", estTime: "3 ساعات" }
          ],
          actionItem: "درب نموذج تصنيف صغير وتأكد أنك قادر على حساب Accuracy وحل مشكلات الأبعاد (Shape Mismatches)."
        },
        {
          id: "m1-w3",
          weekNumber: 3,
          monthNumber: 1,
          title: "Sequential Data & Word Embeddings: RNNs, Word2vec, GloVe",
          titleAr: "البيانات المتسلسلة وتضمين الكلمات: RNNs و Word2vec و GloVe",
          estHours: 15,
          primarySource: {
            title: "Your Course: Lecture 13 and Lecture 15",
            titleAr: "كورس الفيديو الخاص بك: المحاضرة 13 والمحاضرة 15",
            guide: "Lecture 13 (sequential data, RNNs, next word prediction) & Lecture 15 (learning embeddings, Word2vec, GloVe).",
            url: "#"
          },
          backupSource: {
            title: "CS224N (Stanford): First 2 Lectures only",
            titleAr: "محاضرات ستانفورد CS224N: أول محاضرتين فقط",
            guide: "YouTube, word vectors. Use only if embeddings are still unclear after Lecture 15.",
            url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4"
          },
          tasks: [
            { id: "m1-w3-t1", text: "فهم طبيعة البيانات النصية المتسلسلة ومشاكل الشبكات التقليدية معها (Variable Length)", estTime: "3 ساعات" },
            { id: "m1-w3-t2", text: "بنية الـ Vanilla RNN ومفهوم الحالة المخفية (Hidden State) والتنبؤ بالكلمة القادمة", estTime: "4 ساعات" },
            { id: "m1-w3-t3", text: "تضمين الكلمات (Word Embeddings): الفرق بين One-Hot Encoding و Dense Embeddings", estTime: "4 ساعات" },
            { id: "m1-w3-t4", text: "فهم آلية Word2vec (Skip-gram, CBOW) و GloVe وكيف تعبر المتجهات عن المعنى", estTime: "3 ساعات" }
          ],
          actionItem: "استخدم PyTorch nn.Embedding وقم بتجربة تحميل واستخدام تضمينات جاهزة على جمل مختلفة."
        },
        {
          id: "m1-w4",
          weekNumber: 4,
          monthNumber: 1,
          title: "Gated Sequence Models: GRU, LSTM, Bidirectional RNNs",
          titleAr: "النماذج ذات البوابات: GRU و LSTM والـ Bidirectional RNNs وتطبيقها على نصوص حقيقية",
          estHours: 16,
          primarySource: {
            title: "Your Course: Lecture 14 and Practice Notebook 7",
            titleAr: "كورس الفيديو الخاص بك: المحاضرة 14 والدفتر العملي 7",
            guide: "Lecture 14 (GRU, LSTM, BiLSTM) and Practice Notebook 7 (spam classification & NER).",
            url: "#"
          },
          backupSource: {
            title: "RNN and LSTM Explained (StatQuest)",
            titleAr: "شرح RNN و LSTM من قناة StatQuest",
            guide: "YouTube, short and visual. Use it if the gates in LSTM and GRU do not click.",
            url: "https://www.youtube.com/watch?v=8HyCNIVRbSU"
          },
          tasks: [
            { id: "m1-w4-t1", text: "فهم مشكلة تلاشي وتفجر الانحدار (Vanishing/Exploding Gradient) في RNN العادية", estTime: "3 ساعات" },
            { id: "m1-w4-t2", text: "فهم بوابات الـ LSTM الثلاث: Forget Gate, Input Gate, Output Gate والـ Cell State", estTime: "4 ساعات" },
            { id: "m1-w4-t3", text: "مقارنة الـ GRU مع الـ LSTM وفهم بنية الشبكة ثنائية الاتجاه (Bidirectional RNN)", estTime: "3 ساعات" },
            { id: "m1-w4-t4", text: "دراسة وتطبيق Practice Notebook 7 (تصنيف الرسائل المزعجة Spam وتسمية الكيانات NER)", estTime: "4 ساعات" }
          ],
          actionItem: "إتمام مشروع الشهر الأول: مصنف المشاعر (Sentiment Classifier)."
        }
      ],
      project: {
        id: "proj-1",
        monthNumber: 1,
        title: "Month 1 Project: Sentiment Classifier (LSTM)",
        titleAr: "مشروع الشهر الأول: مصنف المشاعر باستخدام LSTM/GRU",
        objective: "Classify text as positive or negative with an LSTM or GRU in PyTorch. Use a dataset different from Practice Notebook 7 (for example Arabic reviews) so it is yours.",
        objectiveAr: "بناء نموذج تصنيف نصوص (إيجابي / سلبي) باستخدام LSTM أو GRU في PyTorch، على مجموعة بيانات حقيقية مختلفة (مثل تقييمات عربية أو أفلام) ليكون مشروعاً خاصاً بك.",
        doneWhen: [
          "كود نظيف منظم ومرفوع على مستودع GitHub عام.",
          "ملف README يشرح مجموعة البيانات المستخدمة، معمارية النموذج، والنتائج بالأرقام.",
          "تحليل أخطاء موجز (Short error analysis) يوضح 3-5 أمثلة أخطأ فيها النموذج وسبب الخطأ."
        ]
      }
    },
    {
      id: "month-2",
      number: 2,
      title: "Transformers and Large Language Models",
      titleAr: "الشهر الثاني: المحولات (Transformers) ونماذج اللغات الكبيرة (LLMs)",
      description: "Understand the architecture that every modern generative model is built on.",
      descriptionAr: "فهم المعمارية الثورية التي بُنيت عليها جميع نماذج الذكاء الاصطناعي التوليدي الحديثة من الألف إلى الياء.",
      themeColor: "#8b5cf6",
      weeks: [
        {
          id: "m2-w1",
          weekNumber: 1,
          monthNumber: 2,
          title: "Attention & The Transformer: BERT and GPT Internals",
          titleAr: "آلية الانتباه (Attention) والمحول: كيف تم بناء BERT و GPT",
          estHours: 16,
          primarySource: {
            title: "Your Course: Lecture 16 and Practice Notebook 8",
            titleAr: "كورس الفيديو الخاص بك: المحاضرة 16 والدفتر العملي 8",
            guide: "Attention mechanism, Transformers, BERT, GPT, then the notebook on news classification and person NER.",
            url: "#"
          },
          backupSource: {
            title: "The Illustrated Transformer (Jay Alammar)",
            titleAr: "المحول المصور من جاي علامار (The Illustrated Transformer)",
            guide: "Free blog post, the classic visual explainer. Read it after the lecture to lock the idea in.",
            url: "https://jalammar.github.io/illustrated-transformer/"
          },
          tasks: [
            { id: "m2-w1-t1", text: "فهم مشكلة الـ Bottleneck في نماذج Seq2Seq وظهور آلية الانتباه (Attention Mechanism)", estTime: "3 ساعات" },
            { id: "m2-w1-t2", text: "حسابات الـ Scaled Dot-Product Attention والمتجهات الثلاثة: Query, Key, Value", estTime: "4 ساعات" },
            { id: "m2-w1-t3", text: "فهم الـ Multi-Head Attention والـ Positional Encoding ولماذا نتخلى عن التكرار تماماً", estTime: "4 ساعات" },
            { id: "m2-w1-t4", text: "الفرق الجوهري بين نماذج الـ Encoder-only (BERT) ونماذج الـ Decoder-only (GPT)", estTime: "3 ساعات" }
          ],
          actionItem: "تنفيذ الدفتر العملي رقم 8 على تصنيف الأخبار واستخراج الكيانات وفهم مصفوفة الانتباه."
        },
        {
          id: "m2-w2",
          weekNumber: 2,
          monthNumber: 2,
          title: "Hugging Face Transformers: Pipelines, Pretrained Models, Fine-tuning",
          titleAr: "مكتبة Hugging Face Transformers: الـ Pipelines، النماذج الجاهزة، والضبط الدقيق",
          estHours: 16,
          primarySource: {
            title: "Hugging Face LLM / NLP Course (huggingface.co/learn)",
            titleAr: "كورس هجينج فيس الرسمي (Hugging Face NLP Course)",
            guide: "Free. Do the early chapters on pipelines, tokenizers, and fine-tuning with Trainer API.",
            url: "https://huggingface.co/learn/nlp-course"
          },
          backupSource: {
            title: "Transformers Documentation + Colab Notebooks",
            titleAr: "توثيق Transformers الرسمي ودفاتر Colab التفاعلية",
            guide: "Official Hugging Face docs with runnable examples.",
            url: "https://huggingface.co/docs/transformers/index"
          },
          tasks: [
            { id: "m2-w2-t1", text: "استخدام الـ `pipeline` لتنفيذ مهام سريعة: تصنيف، تلخيص، إجابة أسئلة، توليد نصوص", estTime: "3 ساعات" },
            { id: "m2-w2-t2", text: "فهم الـ Tokenizers (Byte-Pair Encoding, WordPiece) وتحويل النصوص لـ Input IDs و Attention Mask", estTime: "4 ساعات" },
            { id: "m2-w2-t3", text: "تحميل النماذج وتخصيص رؤوس التصنيف باستخدام `AutoModelForSequenceClassification`", estTime: "4 ساعات" },
            { id: "m2-w2-t4", text: "استخدام Hugging Face `Trainer` API مع `TrainingArguments` و `evaluate`", estTime: "4 ساعات" }
          ],
          actionItem: "جرب تدريب نموذج مصغر على مهمة تصنيف نصوص باستخدام واجهة Hugging Face Trainer."
        },
        {
          id: "m2-w3",
          weekNumber: 3,
          monthNumber: 2,
          title: "LLM Fundamentals: Tokenization, Base vs Instruct, Training Lifecycle",
          titleAr: "أساسيات نماذج اللغات: التوكنز، نماذج Base مقابل Instruct، ودورة تدريب الشات",
          estHours: 15,
          primarySource: {
            title: "Intro to Large Language Models (Andrej Karpathy)",
            titleAr: "مقدمة نماذج اللغات الكبيرة مع أندريه كارباثي (Intro to LLMs)",
            guide: "YouTube, about 1 hour. The fastest solid overview of modern LLM architecture & lifecycle.",
            url: "https://www.youtube.com/watch?v=zjkBMFhNj_g"
          },
          backupSource: {
            title: "Generative AI with Large Language Models (Coursera)",
            titleAr: "الذكاء الاصطناعي التوليدي مع نماذج اللغات (DeepLearning.AI x AWS)",
            guide: "Coursera course. Longer; take it only if you want deeper theoretical dive or certificate.",
            url: "https://www.coursera.org/learn/generative-ai-with-llms"
          },
          tasks: [
            { id: "m2-w3-t1", text: "مشاهدة محاضرة Andrej Karpathy وتلخيص مراحل التدريب الثلاث: Pretraining, SFT, RLHF", estTime: "3 ساعات" },
            { id: "m2-w3-t2", text: "فهم الفارق بين Base Model (مكمل للنصوص) و Instruct/Chat Model (مستجيب للأوامر)", estTime: "3 ساعات" },
            { id: "m2-w3-t3", text: "فهم نافذة السياق (Context Window)، وتأثير الـ Temperature، والـ Top-p Sampling", estTime: "3 ساعات" },
            { id: "m2-w3-t4", text: "استكشاف منصة Hugging Face Hub والبحث عن أحدث النماذج المفتوحة (Llama, Mistral, Qwen)", estTime: "3 ساعات" }
          ],
          actionItem: "اكتب ملخصاً لمراحل تدريب نماذج اللغات واختبر الفوارق العملية لتغيير معاملات التوليد (Temperature/Top-p)."
        },
        {
          id: "m2-w4",
          weekNumber: 2,
          monthNumber: 2,
          title: "Prompt Engineering: Zero-shot, Few-shot, Chain-of-Thought & JSON",
          titleAr: "هندسة الأوامر (Prompt Engineering): Zero-shot و Few-shot و Chain-of-Thought والإخراج المنظم",
          estHours: 15,
          primarySource: {
            title: "ChatGPT Prompt Engineering for Developers (DeepLearning.AI)",
            titleAr: "دورة هندسة الأوامر للمطورين من DeepLearning.AI",
            guide: "DeepLearning.AI short course by Andrew Ng & Isa Fulford. Free & highly practical.",
            url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/"
          },
          backupSource: {
            title: "Prompt Engineering Guide (promptingguide.ai)",
            titleAr: "دليل هندسة الأوامر الشامل (promptingguide.ai)",
            guide: "Broad reference of advanced prompting techniques, benchmarks, and papers.",
            url: "https://www.promptingguide.ai/"
          },
          tasks: [
            { id: "m2-w4-t1", text: "المبادئ الأساسية: الوضوح، السياق، دور النظام (System Prompt)، وتحديد المهام المحددة", estTime: "3 ساعات" },
            { id: "m2-w4-t2", text: "تقنيات التوجيه: Zero-shot, Few-shot Examples, و Role Prompting", estTime: "3 ساعات" },
            { id: "m2-w4-t3", text: "تقنية سلسلة الأفكار (Chain-of-Thought - CoT) لحل المسائل المعقدة والاستنتاج المنطقي", estTime: "3 ساعات" },
            { id: "m2-w4-t4", text: "إجبار النموذج على إنتاج مخرجات منظمة (Structured JSON Output / Pydantic schema)", estTime: "3 ساعات" }
          ],
          actionItem: "إتمام مشروع الشهر الثاني: Fine-tune a BERT model ومشاركته على Hugging Face Hub."
        }
      ],
      project: {
        id: "proj-2",
        monthNumber: 2,
        title: "Month 2 Project: Fine-tune a BERT Model",
        titleAr: "مشروع الشهر الثاني: ضبط دقيق لنموذج من عائلة BERT",
        objective: "Fine-tune a small BERT-family model on a text classification task using Hugging Face. Lecture 22 part 2 of your course (fine-tuning) can help.",
        objectiveAr: "تدريب وضبط دقيق لنموذج مصغر من عائلة BERT (مثل DistilBERT أو BERT-base-uncased أو MARBERT للغة العربية) على تصنيف نصوص مخصص باستخدام Hugging Face.",
        doneWhen: [
          "دفتر تدريب منظم (Training Notebook) يحتوي كود المعالجة والتدريب كاملاً.",
          "جدول مقارنة نتائج التقييم (Accuracy, F1-Score) مقارنة بنموذج Baseline بسيط.",
          "رفع النموذج المدرب أو مساحة تجربة حية (Interactive Demo) على Hugging Face Hub."
        ]
      }
    },
    {
      id: "month-3",
      number: 3,
      title: "Building Real Generative AI Applications",
      titleAr: "الشهر الثالث: بناء تطبيقات الذكاء الاصطناعي التوليدي الحقيقية والـ RAG",
      description: "Move from understanding models to building something other people can actually use.",
      descriptionAr: "الانتقال من مرحلة فهم النماذج إلى مرحلة هندسة تطبيقات عملية ومربحة يمكن للمستخدمين والشركات استخدامها فعلياً.",
      themeColor: "#10b981",
      weeks: [
        {
          id: "m3-w1",
          weekNumber: 1,
          monthNumber: 3,
          title: "LangChain: Prompts, Chains, Memory & Output Parsers",
          titleAr: "إطار LangChain: الأوامر، السلاسل (Chains)، الذاكرة، ومحللات المخرجات",
          estHours: 16,
          primarySource: {
            title: "LangChain for LLM Application Development (DeepLearning.AI)",
            titleAr: "دورة تطوير تطبيقات LLM مع LangChain من DeepLearning.AI",
            guide: "DeepLearning.AI short course with Harrison Chase (founder of LangChain). Free.",
            url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/"
          },
          backupSource: {
            title: "LangChain Official Documentation (python.langchain.com)",
            titleAr: "توثيق LangChain الرسمي",
            guide: "python.langchain.com. Official docs, modern LCEL syntax, and code examples.",
            url: "https://python.langchain.com/docs/introduction/"
          },
          tasks: [
            { id: "m3-w1-t1", text: "فهم بنية LangChain وتركيب الأوامر الديناميكية باستخدام PromptTemplates", estTime: "3 ساعات" },
            { id: "m3-w1-t2", text: "بناء السلاسل التتابعية باستخدام LangChain Expression Language (LCEL) واستخدام الأنابيب `|`", estTime: "4 ساعات" },
            { id: "m3-w1-t3", text: "إدارة سياق وتاريخ المحادثة (Conversation Memory / Messages History)", estTime: "3 ساعات" },
            { id: "m3-w1-t4", text: "استخدام Output Parsers لتحويل ردود الذكاء الاصطناعي إلى كائنات بايثون و JSON مباشرة", estTime: "3 ساعات" }
          ],
          actionItem: "بناء مسار LCEL متكامل يحلل نصوص العملاء ويخرج تقريراً مهيكلاً بصيغة JSON."
        },
        {
          id: "m3-w2",
          weekNumber: 2,
          monthNumber: 3,
          title: "Vector Databases & RAG: Chunking, Embeddings & Retrieval Quality",
          titleAr: "قواعد البيانات الشعاعية والـ RAG: التقطيع، التضمين، وجودة الاسترجاع",
          estHours: 17,
          primarySource: {
            title: "Your Course: Lecture 22 part 1 and the RAG example",
            titleAr: "كورس الفيديو الخاص بك: المحاضرة 22 الجزء الأول ومثال الـ RAG",
            guide: "The AI-powered chatbot on custom data (RAG), plus 'RAG Example and Our Custom Course Assistant Chatbot'.",
            url: "#"
          },
          backupSource: {
            title: "Building and Evaluating Advanced RAG (DeepLearning.AI)",
            titleAr: "بناء وتقييم الـ RAG المتقدم (DeepLearning.AI)",
            guide: "DeepLearning.AI short course. Free. Perfect for learning chunking strategies & evaluation.",
            url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/"
          },
          tasks: [
            { id: "m3-w2-t1", text: "فهم معمارية الـ RAG (الاسترجاع المعزز بالتوليد): المزايا مقابل الـ Fine-Tuning", estTime: "3 ساعات" },
            { id: "m3-w2-t2", text: "استراتيجيات تقطيع النصوص (Recursive Character Text Splitting) وحجم الـ Chunks وتداخلها Overlap", estTime: "4 ساعات" },
            { id: "m3-w2-t3", text: "إنشاء واستعلام قواعد البيانات الشعاعية (Vector Stores): ChromaDB أو FAISS", estTime: "4 ساعات" },
            { id: "m3-w2-t4", text: "تحسين الاسترجاع: قياس التشابه Cosine Similarity وتقنيات الـ Context Stuffing", estTime: "4 ساعات" }
          ],
          actionItem: "بناء سكربت يستقبل ملف PDF، يقطعه، يخزنه في ChromaDB، وينفذ استعلام تشابهي ناجح."
        },
        {
          id: "m3-w3",
          weekNumber: 3,
          monthNumber: 3,
          title: "Working with LLM APIs & Building a Full-Stack Chatbot",
          titleAr: "العمل مع واجهات برمجة التطبيقات (LLM APIs) وبناء شات بوت متكامل",
          estHours: 16,
          primarySource: {
            title: "Your Course: Gemini API Chatbot and the Flask Code",
            titleAr: "كورس الفيديو الخاص بك: شات بوت Gemini API مع كود Flask",
            guide: "Code for the AI chatbot (website and mobile app) with the Gemini API, plus the Flask backend code.",
            url: "#"
          },
          backupSource: {
            title: "OpenAI API & Anthropic Claude API Official Docs",
            titleAr: "التوثيق الرسمي لواجهات OpenAI و Anthropic API",
            guide: "platform.openai.com/docs and docs.anthropic.com. Learn the same patterns on a second API.",
            url: "https://platform.openai.com/docs"
          },
          tasks: [
            { id: "m3-w3-t1", text: "الحصول على API Keys وإعداد استدعاءات Gemini API / OpenAI API بأمان وحماية المفاتيح", estTime: "3 ساعات" },
            { id: "m3-w3-t2", text: "بناء Backend متكامل باستخدام Flask أو FastAPI لاستقبال الأسئلة وإرسال الردود", estTime: "4 ساعات" },
            { id: "m3-w3-t3", text: "بناء واجهة مستخدم ويب بسيطة وتفاعلية للشات (HTML/JS أو Streamlit)", estTime: "4 ساعات" },
            { id: "m3-w3-t4", text: "تنفيذ الـ Streaming Response لظهور الحروف والكلمات مباشرة كلمة بكلمة مثل ChatGPT", estTime: "3 ساعات" }
          ],
          actionItem: "ربط واجهة المستخدم بـ Flask API واستدعاء نموذج ذكاء اصطناعي حقيقي بنجاح."
        },
        {
          id: "m3-w4",
          weekNumber: 4,
          monthNumber: 3,
          title: "Fine-tuning Models on Custom Data (LoRA & QLoRA)",
          titleAr: "الضبط الدقيق للنماذج على بياناتك الخاصة (تقنيات LoRA و QLoRA)",
          estHours: 16,
          primarySource: {
            title: "Your Course: Lecture 22 part 2 and Fine-tuning Examples",
            titleAr: "كورس الفيديو الخاص بك: المحاضرة 22 الجزء الثاني وأمثلة الـ Fine-tuning",
            guide: "Fine-tuning for the chatbot, custom Phi-3 model on custom data (people info extraction), course assistant.",
            url: "#"
          },
          backupSource: {
            title: "Hugging Face PEFT Documentation (LoRA & QLoRA)",
            titleAr: "توثيق Hugging Face PEFT لتقنيات الضبط خفيف الوزن",
            guide: "Use it for Parameter-Efficient Fine-Tuning specifically. Learn how to train models on single consumer GPUs.",
            url: "https://huggingface.co/docs/peft/index"
          },
          tasks: [
            { id: "m3-w4-t1", text: "فهم متى نستخدم RAG ومتى نحتاج Fine-Tuning (الأسلوب مقابل المعرفة الجديدة)", estTime: "3 ساعات" },
            { id: "m3-w4-t2", text: "فهم تقنيات الـ PEFT وكيف يعمل الـ Low-Rank Adaptation (LoRA) دون تغيير أوزان النموذج الأصلية", estTime: "4 ساعات" },
            { id: "m3-w4-t3", text: "فهم الـ Quantization والـ QLoRA (تدريب نماذج 4-bit على بطاقة GPU عادية مثل Google Colab T4)", estTime: "4 ساعات" },
            { id: "m3-w4-t4", text: "تجهيز مجموعة بيانات التدريب بصيغة Instruction/Response JSONL", estTime: "3 ساعات" }
          ],
          actionItem: "إتمام مشروع الشهر الثالث: RAG Chatbot over your own PDFs."
        }
      ],
      project: {
        id: "proj-3",
        monthNumber: 3,
        title: "Month 3 Project: RAG Chatbot over Your Own PDFs",
        titleAr: "مشروع الشهر الثالث: شات بوت RAG يجيب من ملفات الـ PDF الخاصة بك",
        objective: "Build a chatbot that answers questions from PDF documents you upload, using a vector database such as Chroma or FAISS. Use your own documents, not the course's example data.",
        objectiveAr: "بناء شات بوت يجيب بدقة على الأسئلة من مستندات وملفات PDF ترفعها أنت، باستخدام قاعدة بيانات شعاعية (مثل ChromaDB أو FAISS)، ويعتمد على مستنداتك الخاصة (مثل وثائق تقنية أو كتب).",
        doneWhen: [
          "الإجابات تعرض الفقرات والمصادر الأصلية التي اعتمد عليها النموذج (Citations / Source passages).",
          "اختبار النظام على ما لا يقل عن 20 سؤالاً حقيقياً والتأكد من عدم وجود هلوسة (Hallucination).",
          "ملف README احترافي يشرح استراتيجية التقطيع (Chunking Strategy)، نموذج التضمين، وخيارات الاسترجاع."
        ]
      }
    },
    {
      id: "month-4",
      number: 4,
      title: "Deployment, MLOps, and Portfolio",
      titleAr: "الشهر الرابع: النشر السحابي، الـ MLOps، وبناء المعرض المهني (Portfolio)",
      description: "Turn your projects into live, shareable products and get ready for the job market.",
      descriptionAr: "تحويل مشروعاتك من مجرد أكواد محلية إلى منتجات حية قابلة للاستخدام والمشاركة، والتحضير لسوق العمل والـ Freelance.",
      themeColor: "#f59e0b",
      weeks: [
        {
          id: "m4-w1",
          weekNumber: 1,
          monthNumber: 4,
          title: "Serving an ML System: Production APIs with FastAPI & Streamlit",
          titleAr: "بناء وتشغيل خدمات الـ AI: بناء واجهات برمجية إنتاجية مع FastAPI و Streamlit",
          estHours: 15,
          primarySource: {
            title: "Your Course: Lecture 21 and the Flask Code",
            titleAr: "كورس الفيديو الخاص بك: المحاضرة 21 وكود Flask",
            guide: "Building and serving machine learning systems in production.",
            url: "#"
          },
          backupSource: {
            title: "FastAPI Official Tutorial & Streamlit Documentation",
            titleAr: "دروس FastAPI الرسمية وتوثيق Streamlit",
            guide: "fastapi.tiangolo.com. FastAPI appears often in job listings. Combine with Streamlit for rapid demo UIs.",
            url: "https://fastapi.tiangolo.com/tutorial/"
          },
          tasks: [
            { id: "m4-w1-t1", text: "بناء REST API سريع باستخدام FastAPI مع استخدام Pydantic للتحقق من صحة المدخلات", estTime: "4 ساعات" },
            { id: "m4-w1-t2", text: "التعامل مع الـ CORS والـ Async Endpoints لتحمل الطلبات المتزامنة", estTime: "3 ساعات" },
            { id: "m4-w1-t3", text: "إنشاء واجهة تفاعلية كاملة للمشروع باستخدام مكتبة Streamlit في ساعات معدودة", estTime: "4 ساعات" },
            { id: "m4-w1-t4", text: "معالجة الأخطاء (Error Handling) وتوفير توثيق Swagger التلقائي للـ API", estTime: "3 ساعات" }
          ],
          actionItem: "نشر خدمة FastAPI أو تطبيق Streamlit يعمل محلياً بكفاءة وتوثيق Swagger متاح على /docs."
        },
        {
          id: "m4-w2",
          weekNumber: 2,
          monthNumber: 4,
          title: "Docker & MLOps Basics: Containers, Tracking & Versioning",
          titleAr: "أساسيات Docker والـ MLOps: الحاويات، تتبع التجارب، وإدارة الإصدارات",
          estHours: 16,
          primarySource: {
            title: "Docker for Beginners (freeCodeCamp on YouTube)",
            titleAr: "دورة Docker للمبتدئين من freeCodeCamp",
            guide: "Learn containers, Dockerfile, images, ports, and multi-container setups.",
            url: "https://www.youtube.com/watch?v=fqMOX6JJhGo"
          },
          backupSource: {
            title: "MLflow Documentation (mlflow.org)",
            titleAr: "توثيق مكتبة MLflow الرسمي",
            guide: "mlflow.org. Track experiments, parameters, metrics, and model versions cleanly.",
            url: "https://mlflow.org/docs/latest/index.html"
          },
          tasks: [
            { id: "m4-w2-t1", text: "فهم فلسفة الـ Containerization والفرق بين الحاوية والـ Virtual Machine", estTime: "3 ساعات" },
            { id: "m4-w2-t2", text: "كتابة ملف `Dockerfile` مخصص لتطبيق بايثون للذكاء الاصطناعي وبناء الـ Image", estTime: "4 ساعات" },
            { id: "m4-w2-t3", text: "تشغيل التطبيق داخل حاوية ومشاركة المنافذ (Port Mapping) والملفات (Volumes)", estTime: "4 ساعات" },
            { id: "m4-w2-t4", text: "مفهوم تتبع التجارب وحفظ إصدارات النماذج والأوزان مع الـ Metadata", estTime: "3 ساعات" }
          ],
          actionItem: "قم بعمل Dockerize لتطبيق الـ RAG وتأكد أنه يعمل بحاوية بضغطة زر واحدة."
        },
        {
          id: "m4-w3",
          weekNumber: 3,
          monthNumber: 4,
          title: "Optional: Diffusion Models & Image Generation",
          titleAr: "اختياري: نماذج الانتشار (Diffusion Models) وتوليد الصور بالذكاء الاصطناعي",
          estHours: 14,
          primarySource: {
            title: "Your Course: Lecture 17 and Practice Notebook 9",
            titleAr: "كورس الفيديو الخاص بك: المحاضرة 17 والدفتر العملي 9",
            guide: "Diffusion models, super-resolution, and colorization projects. (Add Lecture 18 if you have time).",
            url: "#"
          },
          backupSource: {
            title: "How Diffusion Models Work (DeepLearning.AI)",
            titleAr: "كيف تعمل نماذج الانتشار من DeepLearning.AI",
            guide: "DeepLearning.AI short course by Sharon Zhou. Clear, visual explanation of noise schedule and UNet.",
            url: "https://www.deeplearning.ai/short-courses/how-diffusion-models-work/"
          },
          tasks: [
            { id: "m4-w3-t1", text: "فهم فكرة الـ Forward Process (إضافة الضوضاء) والـ Reverse Process (إزالة الضوضاء)", estTime: "3 ساعات" },
            { id: "m4-w3-t2", text: "دور شبكة الـ UNet والتوجيه بالنص (Text Conditioning عبر CLIP Embeddings)", estTime: "4 ساعات" },
            { id: "m4-w3-t3", text: "تجربة مكتبة Hugging Face `diffusers` لتوليد الصور محلياً أو على Colab", estTime: "4 ساعات" },
            { id: "m4-w3-t4", text: "استكشاف مشاريع التلوين ورفع الدقة (Super-Resolution) المذكورة في المحاضرة", estTime: "3 ساعات" }
          ],
          actionItem: "جرب تشغيل مسار Stable Diffusion بسيط من كود بايثون وحفظ الصورة المولدة."
        },
        {
          id: "m4-w4",
          weekNumber: 4,
          monthNumber: 4,
          title: "Portfolio & Job Preparation: GitHub, README Quality, CV, LinkedIn",
          titleAr: "بناء المعرض المهني والتحضير لسوق العمل: GitHub، السيرة الذاتية، و LinkedIn",
          estHours: 16,
          primarySource: {
            title: "Build a Standout Data / AI Portfolio (Towards Data Science)",
            titleAr: "بناء بورتفوليو متميز في الذكاء الاصطناعي من Towards Data Science",
            guide: "Industry standards for AI portfolios that attract technical recruiters and high-ticket clients.",
            url: "https://towardsdatascience.com/"
          },
          backupSource: {
            title: "GitHub & LinkedIn Real Portfolio Analysis",
            titleAr: "تحليل 3 نماذج لمعارض حقيقية لمهندسي ذكاء اصطناعي",
            guide: "Search 'AI engineer portfolio examples' on GitHub/LinkedIn and reverse-engineer what makes them stand out.",
            url: "https://github.com/topics/ai-portfolio"
          },
          tasks: [
            { id: "m4-w4-t1", text: "تنظيم ملف الـ GitHub Profile وعرض المشاريع الرئيسية بدبابيس (Pinned Repos)", estTime: "4 ساعات" },
            { id: "m4-w4-t2", text: "كتابة README احترافي لكل مشروع يشمل: GIF/فيديو للشات، معمارية النظام، وطريقة التشغيل", estTime: "4 ساعات" },
            { id: "m4-w4-t3", text: "تحديث حساب LinkedIn بعنوان وظيفي واضح (AI / GenAI Engineer) والخبرات المكتسبة", estTime: "4 ساعات" },
            { id: "m4-w4-t4", text: "صياغة سيرة ذاتية تركز على الأثر الفعلي (Impact) واستغلال خبرتك في SQL و Power BI", estTime: "3 ساعات" }
          ],
          actionItem: "إتمام مشروع الشهر الرابع: نشر أفضل مشروع برابط عام مباشر ومشاركته على LinkedIn."
        }
      ],
      project: {
        id: "proj-4",
        monthNumber: 4,
        title: "Month 4 Project: Deploy Your Best Project Publicly",
        titleAr: "مشروع الشهر الرابع: نشر أفضل مشروع لك أونلاين برابط عام",
        objective: "Deploy your RAG chatbot (or a new project) with a public link using Streamlit Community Cloud or Hugging Face Spaces.",
        objectiveAr: "نشر شات بوت الـ RAG (أو مشروع متكامل) على الإنترنت برابط عام مباشر يستطيع أي شخص تجربته، عبر Streamlit Community Cloud أو Hugging Face Spaces.",
        doneWhen: [
          "رابط مباشر حي (Live URL) يعمل بدون أخطاء ومتاح للجميع لتجربته.",
          "ملف README احترافي يحتوي على لقطات شاشة (Screenshots) أو GIF متحرك يشرح تجربة الاستخدام.",
          "منشور احترافي واحد على LinkedIn يوضح فكرة المشروع، المعمارية المستخدمة، وما تعلمته أثناء بنائه."
        ]
      }
    },
    {
      id: "month-5",
      number: 5,
      title: "Agentic AI: Tools, Workflows, and Reliable Agents",
      titleAr: "الشهر الخامس: الذكاء الاصطناعي الوكيل (Agentic AI): الأدوات، مسارات العمل، والوكلاء الموثوقون",
      description: "Go from models that answer to systems that take actions: plan, use tools, and finish tasks.",
      descriptionAr: "الارتقاء من نماذج تكتفي بالرد بالنصوص، إلى أنظمة ذكية تتخذ إجراءات حقيقية: تخطط، تستخدم أدوات، وتنهي مهام كاملة باستقلالية وموثوقية.",
      themeColor: "#ec4899",
      weeks: [
        {
          id: "m5-w1",
          weekNumber: 1,
          monthNumber: 5,
          title: "The Agent Loop: Tool Calling, ReAct, Workflows vs Agents",
          titleAr: "حلقة الوكيل (Agent Loop): استدعاء الأدوات، نمط ReAct، ومقارنة Workflows بالـ Agents",
          estHours: 16,
          primarySource: {
            title: "Hugging Face AI Agents Course (Unit 1)",
            titleAr: "كورس وكلاء الذكاء الاصطناعي من Hugging Face (الوحدة الأولى)",
            guide: "huggingface.co/learn. Free, comprehensive course with free certification on AI Agents.",
            url: "https://huggingface.co/learn/agents-course/unit1/introduction"
          },
          backupSource: {
            title: "Building Effective Agents (Anthropic Engineering)",
            titleAr: "مقال أنثروبيك الهندسي المرجعي: بناء وكلاء فعالين (Building Effective Agents)",
            guide: "Anthropic research. Gold standard on when to use deterministic workflows vs autonomous agents.",
            url: "https://www.anthropic.com/research/building-effective-agents"
          },
          tasks: [
            { id: "m5-w1-t1", text: "فهم فلسفة الوكيل: حلقة Thought -> Action -> Observation -> Final Answer", estTime: "4 ساعات" },
            { id: "m5-w1-t2", text: "استدعاء الدوال (Tool / Function Calling) وكيف يفهم النموذج تعريف الأدوات بصيغة JSON Schema", estTime: "4 ساعات" },
            { id: "m5-w1-t3", text: "الفرق الحاسم بين مسارات العمل الثابتة (Workflows) والوكلاء المستقلين (Autonomous Agents)", estTime: "4 ساعات" },
            { id: "m5-w1-t4", text: "تطبيق عملي: بناء وكيل بسيط يستدعي دالة آلة حاسبة ودالة جلب طقس حقيقية", estTime: "4 ساعات" }
          ],
          actionItem: "بناء وكيل بايثون يستقبل طلباً معقداً ويختار الأداة المناسبة وينفذها ويعود بالنتيجة."
        },
        {
          id: "m5-w2",
          weekNumber: 2,
          monthNumber: 5,
          title: "LangGraph: State, Memory, Branching & Human-in-the-loop",
          titleAr: "إطار LangGraph: إدارة الحالة، التفرعات، والتحكم البشري (Human-in-the-loop)",
          estHours: 17,
          primarySource: {
            title: "AI Agents in LangGraph (DeepLearning.AI)",
            titleAr: "دورة بناء وكلاء الذكاء الاصطناعي مع LangGraph من DeepLearning.AI",
            guide: "Taught by Harrison Chase & Rotem Weiss. Free to audit. State machines for AI workflows.",
            url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/"
          },
          backupSource: {
            title: "Introduction to LangGraph (LangChain Academy)",
            titleAr: "مقدمة LangGraph من أكاديمية LangChain الرسمية",
            guide: "Free in-depth course covering cyclic graphs, checkpoints, state, and deployment.",
            url: "https://academy.langchain.com/courses/intro-to-langgraph"
          },
          tasks: [
            { id: "m5-w2-t1", text: "فهم فكرة الرسوم البيانية الدائرية (Cyclic Graphs) وإدارة الحالة المركزية (State Schema)", estTime: "4 ساعات" },
            { id: "m5-w2-t2", text: "إنشاء العقد (Nodes) والروابط الشرطية (Conditional Edges) للتوجيه والتكرار", estTime: "4 ساعات" },
            { id: "m5-w2-t3", text: "الاحتفاظ بالذاكرة باستخدام الـ Checkpointers لإمكانية التراجع والـ Time Travel", estTime: "4 ساعات" },
            { id: "m5-w2-t4", text: "تطبيق الموافقة البشرية (Human-in-the-loop) لإيقاف المسار عند الإجراءات الحساسة لطلب الإذن", estTime: "4 ساعات" }
          ],
          actionItem: "بناء Graph في LangGraph يطلب تأكيد المستخدم قبل تنفيذ أي عملية كتابة أو تعديل."
        },
        {
          id: "m5-w3",
          weekNumber: 3,
          monthNumber: 5,
          title: "MCP (Model Context Protocol) & Multi-Agent Systems",
          titleAr: "بروتوكول سياق النماذج (MCP) والأنظمة متعددة الوكلاء (Multi-Agent Systems)",
          estHours: 16,
          primarySource: {
            title: "MCP: Build Rich-Context AI Apps with Anthropic (DeepLearning.AI)",
            titleAr: "دورة بناء تطبيقات غنية بالسياق باستخدام بروتوكول MCP من DeepLearning.AI",
            guide: "Learn the universal open standard created by Anthropic for connecting AI models to data sources & tools.",
            url: "https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/"
          },
          backupSource: {
            title: "Multi AI Agent Systems with crewAI (DeepLearning.AI)",
            titleAr: "أنظمة الوكلاء المتعددة مع crewAI من DeepLearning.AI",
            guide: "Free course with João Moura (founder of crewAI). Roles, task delegation, and agent collaboration.",
            url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/"
          },
          tasks: [
            { id: "m5-w3-t1", text: "فهم معيار MCP (Model Context Protocol) ولماذا هو مستقبل ربط الـ LLM بأي نظام خارجي", estTime: "4 ساعات" },
            { id: "m5-w3-t2", text: "بناء MCP Server بسيط يعرض أدوات (Tools) ومصادر (Resources) للاستخدام الفوري", estTime: "4 ساعات" },
            { id: "m5-w3-t3", text: "بناء نظام متعدد الوكلاء (Multi-Agent System) مع تخصص واضح لكل وكيل (Researcher, Coder, Reviewer)", estTime: "4 ساعات" },
            { id: "m5-w3-t4", text: "تنظيم تدفق المهام بين الوكلاء وإدارة التخاطب والمخرجات المشتركة", estTime: "3 ساعات" }
          ],
          actionItem: "تشغيل خادم MCP مخصص أو بناء فريق من وكيلين يتعاونان معاً لإنتاج تقرير برمجي متكامل."
        },
        {
          id: "m5-w4",
          weekNumber: 4,
          monthNumber: 5,
          title: "Making Agents Reliable: Evals, Guardrails, Tracing & Cost Control",
          titleAr: "جعل الوكلاء موثوقين للإنتاج: التقييم (Evals)، الحواجز، التتبع، والتحكم بالتكلفة",
          estHours: 16,
          primarySource: {
            title: "Your AI Product Needs Evals (Hamel Husain)",
            titleAr: "مقال هامل حسين الشهير: منتج الذكاء الاصطناعي يحتاج تقييمات منهجية",
            guide: "Practical, rigorous engineering guide on building reliable eval suites for real-world LLM apps.",
            url: "https://hamel.dev/blog/posts/evals/"
          },
          backupSource: {
            title: "LangSmith Documentation & Observability",
            titleAr: "توثيق LangSmith الرسمي لرصد وتتبع تطبيقات الـ AI",
            guide: "docs.smith.langchain.com. Monitor traces, latency, costs, and token usage in real time.",
            url: "https://docs.smith.langchain.com/"
          },
          tasks: [
            { id: "m5-w4-t1", text: "فهم لماذا تفشل الوكلاء في الإنتاج وكيفية بناء جناح اختبار وتقييم (Evaluation Suite)", estTime: "4 ساعات" },
            { id: "m5-w4-t2", text: "تجهيز مجموعة حالات اختبار (Golden Test Dataset) لحساب معدل النجاح (Success Rate)", estTime: "4 ساعات" },
            { id: "m5-w4-t3", text: "استخدام أدوات التتبع (Tracing & Observability) مثل LangSmith لرؤية ما حدث في كل استدعاء", estTime: "4 ساعات" },
            { id: "m5-w4-t4", text: "وضع حواجز حماية (Guardrails) وحساب التكلفة لكل استدعاء وتفادي الحلقات اللانهائية (Infinite Loops)", estTime: "3 ساعات" }
          ],
          actionItem: "إتمام مشروع التخرج الأكبر: وكيل موثوق يستخدم أدوات حقيقية ومقاس النجاح بالأرقام."
        }
      ],
      project: {
        id: "proj-5",
        monthNumber: 5,
        title: "Month 5 Project: A Tool-Using Agent You Can Trust",
        titleAr: "مشروع الشهر الخامس (النهائي): وكيل ذكي موثوق يستخدم أدوات واقعية",
        objective: "Build an agent that combines RAG with 2 to 3 real tools (for example a database query, web search, or an MCP server) to complete a multi-step task, with human approval for risky actions.",
        objectiveAr: "بناء وكيل ذكي يدمج بين الـ RAG وما بين 2 إلى 3 أدوات حقيقية (مثل استعلام قاعدة بيانات SQL، بحث ويب حقيقي، أو خادم MCP) لإنجاز مهمة متعددة المراحل، مع طلب موافقة بشرية للعمليات الحساسة.",
        doneWhen: [
          "مجموعة اختبارات تضم من 30 إلى 50 حالة اختبار فعلية مع نسبة نجاح مقاسة بالأرقام (Measured Success Rate).",
          "سجلات وتتبع (Traces) لأمثلة حقيقية فشل فيها الوكيل وتم تصحيحها لمنع التكرار.",
          "عرض توضيحي عام (Public Demo) يعمل بكفاءة.",
          "ملف README احترافي يوضح الأرقام والمقاييس الدقيقة (Latency, Accuracy, Cost per run)."
        ]
      }
    }
  ],
  careerAdvices: [
    {
      id: "career-1",
      title: "Focus on 3-4 Deployed Projects",
      titleAr: "التركيز على 3 إلى 4 مشاريع منشورة وقوية",
      text: "Aim for 3 to 4 deployed projects (months 3, 4, and 5 are the strongest) rather than many half-finished ones.",
      textAr: "احرص على إنهاء ونشر من 3 إلى 4 مشاريع متكاملة على السحابة (مشاريع الأشهر 3 و 4 و 5 هي الأقوى والأعلى طلباً) بدلاً من بدء مشاريع كثيرة وتركها في المنتصف.",
      done: false
    },
    {
      id: "career-2",
      title: "Start Applying in Month 4",
      titleAr: "ابدأ التقديم في الشهر الرابع، لا تنتظر للشهر الخامس",
      text: "Start applying in month 4, not after month 5. Target internships and junior roles at small companies and startups first; larger employers often ask for years of experience even for junior titles.",
      textAr: "ابدأ التقديم للوظائف وفرص العمل الحر في الشهر الرابع ولا تنتظر حتى نهاية الشهر الخامس. استهدف الشركات الناشئة والصغيرة والشركات التقنية المرنة أولاً حيث يهتمون بما بنيته بيدك.",
      done: false
    },
    {
      id: "career-3",
      title: "Specialize on Upwork with Clear Offer",
      titleAr: "تخصص على Upwork بعرض قيمة محدد وواضح",
      text: "On Upwork, specialise in one clear offer, for example 'chatbot that answers from your company documents'. Take small first jobs to earn your first reviews, then raise your rates.",
      textAr: "على منصة Upwork، تخصص في عرض واحد محدد وواضح للعملاء، مثل: 'شات بوت ذكي يجيب من وثائق وملفات شركتك بدقة'، خذ مهاماً أولى صغيرة لكسب تقييمات 5 نجوم ثم ضاعف أسعارك.",
      done: false
    },
    {
      id: "career-4",
      title: "Evaluations Separate You from Tutorial Makers",
      titleAr: "التقييمات الرقمية هي ما يفصلك عن مجرد متبعي الفيديوهات",
      text: "Evaluation is what separates your projects from tutorials. Always report a measured result: accuracy on a test set, failure cases, cost per request.",
      textAr: "التقييم الرقمي المنهجي هو ما يجعلك مهندساً حقيقياً مقارنة بمن ينسخ الفيديوهات. اذكر دائماً أرقاماً في البورتفوليو: نسبة الدقة على اختبارات حقيقية، تكلفة الطلب الواحد، وسرعة الاستجابة.",
      done: false
    },
    {
      id: "career-5",
      title: "Leverage SQL & Power BI Background",
      titleAr: "استغل خلفيتك القوية في SQL و Power BI",
      text: "Your SQL and Power BI background is an advantage: text-to-SQL assistants and data-aware agents are practical projects few beginners can build.",
      textAr: "خلفيتك في SQL و Power BI وتحليل البيانات هي ميزة تنافسية هائلة! وكلاء استعلام قواعد البيانات (Text-to-SQL Agents) ولوحات التحكم الذكية هي مشاريع مطلوبة جداً نادراً ما يجيدها المبتدئون.",
      done: false
    },
    {
      id: "career-6",
      title: "Write Code from Blank File after 30%",
      titleAr: "اكتب الكود من الصفر بعد مشاهدة 30% فقط",
      text: "You do not need to finish 100 percent of courses. Watching 100% feels productive but builds less than writing code from a blank file after 30%.",
      textAr: "لست بحاجة لإنهاء 100% من كل الفيديوهات والكورسات. المشاهدة الكاملة تعطي شعوراً كاذباً بالإنجاز، بينما كتابة الكود من ملف فارغ بعد مشاهدة 30% من الدرس هي ما يبني مهارتك الحقيقية.",
      done: false
    }
  ]
};

// Export if in module environment, or keep as window variable
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ROADMAP_DATA;
}
