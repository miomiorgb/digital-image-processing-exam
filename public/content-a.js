/* 根据作业题干编写的复习参考答案，非教师提供的标准答案。 */
window.CONTENT_A = [
  {
    id: 2, title: "邻域、邻接与连通", topic: "图像基础",
    en: "Explain Neighbors, Adjacency, Connectivity and the connection between them.",
    zh: "解释邻域、邻接、连通，以及三者之间的联系。",
    cues: [{en:"neighbors",zh:"位置上的邻居"},{en:"adjacency",zh:"一步是否允许连接"},{en:"connectivity",zh:"能否沿路径到达"}],
    intuition: "先确定哪些像素住在附近，再规定哪些像素之间能走一步，最后问能否沿着这些步子从一个像素走到另一个像素。",
    points: [
      {label:"邻域只描述位置",text:"对 p=(x,y)，N₄(p)={(x±1,y),(x,y±1)}；对角邻域 Nᴅ(p)={(x±1,y±1)}；N₈(p)=N₄(p)∪Nᴅ(p)。超出图像边界的位置不计入。",en:"The 4-neighbors share an edge, and the 8-neighbors include both edge-sharing and diagonal neighbors.",aliases:["4邻域","4-neighbors","N4","上下左右","对角","diagonal","8邻域","8-neighbors"]},
      {label:"邻接还要求像素值符合条件",text:"先给定允许的灰度集合 V。p、q 的值均属于 V，且 q∈N₄(p) 时为 4 邻接；q∈N₈(p) 时为 8 邻接。几何上相邻并不自动表示属于同一目标。",en:"Two pixels with values in V are 4-adjacent or 8-adjacent if one lies in the corresponding neighborhood of the other.",aliases:["V","灰度集合","values in","4-adjacent","8-adjacent","邻接"]},
      {label:"m 邻接消除部分对角歧义",text:"m 邻接允许 4 邻接；也允许对角邻接，但此时 N₄(p)∩N₄(q) 中不能有值属于 V 的像素。它限制多余的对角连接。",en:"Mixed adjacency permits diagonal adjacency only when the common 4-neighbors contain no pixel with a value in V.",aliases:["m邻接","mixed","共同4邻域","common 4","交集","∩"]},
      {label:"连通通过路径定义",text:"若存在完全位于集合 S 内、相邻两点均满足指定邻接关系的像素路径，则 p、q 在 S 中连通。所有相互连通的像素构成连通分量。联系：邻域→邻接规则→路径与连通性。",en:"Two pixels are connected if a path of adjacent pixels exists between them within the set; connected pixels form a connected component.",aliases:["路径","path","连通分量","connected component","邻域","邻接"]}
    ],
    trap: "答题先说明 V 和采用的邻接类型。4 连通与 8 连通可能给出不同的连通分量数。m 邻接的条件是公共 4 邻域内没有属于 V 的像素。",
    variants: ["Distinguish pixel neighborhood, adjacency and connectivity.","How is connectivity defined from a chosen pixel adjacency relation?"],
    quiz: {prompt:"二值图中，V={1}。两个值为 1 的像素只有对角接触。哪项一定成立？",options:["它们 4 邻接","它们 8 邻接","它们一定 m 邻接","它们不可能连通"],answer:1,explain:"对角位置属于 8 邻域，所以一定 8 邻接。是否 m 邻接还取决于公共 4 邻域；是否 4 连通还可能取决于其他路径。"},
    cloze: {text:"像素是否连通，需要判断集合内是否存在满足指定邻接规则的 ___。",answers:["路径","path","像素路径","pixel path"],explain:"邻接检查一步，连通检查一条由许多合法步子组成的路径。"},
    example:"<p>令 V={1}：<code>1 0 / 0 1</code> 的两个 1 为 8 邻接，也为 m 邻接，但不是 4 邻接。换成 <code>1 1 / 0 1</code> 后，这两个对角的 1 不再 m 邻接，因为公共 4 邻域中已有一个 1；它们仍能沿两步 4 邻接路径连通。</p>"
  },
  {
    id: 3, title: "图像研究的三个层次", topic: "图像基础",
    en: "Explain the three levels of research about image and the relation between them.",
    zh: "解释图像研究的三个层次及相互关系。",
    cues: [{en:"three levels",zh:"处理、分析、理解"},{en:"image processing",zh:"图像输入、图像输出"},{en:"image understanding",zh:"语义与决策"}],
    intuition: "看一张道路照片：先去噪让它清楚，再分出汽车并测量位置，最后判断是否存在危险。",
    points: [
      {label:"低层：图像处理",text:"图像处理主要把图像变成另一幅图像，改善质量或使其适合后续处理，例如去噪、增强、复原。输入与输出通常都是图像。",en:"Low-level image processing takes an image as input and usually produces another image, for example by denoising or enhancement.",aliases:["图像处理","image processing","低层","low-level","图像到图像"]},
      {label:"中层：图像分析",text:"图像分析从图像中分割目标、提取和描述特征，得到边界、面积、位置等符号或数值信息。输入通常是图像，输出常是特征或目标描述。",en:"Mid-level image analysis extracts objects and measurable features through segmentation, representation and description.",aliases:["图像分析","image analysis","分割","segmentation","特征","features"]},
      {label:"高层：图像理解",text:"图像理解利用特征、上下文和知识解释目标与场景，形成语义判断或决策，例如理解道路场景、判断行为。",en:"High-level image understanding interprets objects and scenes using features, context and knowledge to support semantic decisions.",aliases:["图像理解","image understanding","语义","semantic","知识","knowledge","决策"]},
      {label:"逐层抽象、相互支撑",text:"低层结果支撑分析，分析结果支撑理解；高层知识也可反馈指导低层处理。三层边界并非绝对，具体任务可能跨层。",en:"The levels move from pixels to features and then to meaning; they support one another and may overlap.",aliases:["像素","pixels","特征","features","语义","meaning","反馈","支撑"]}
    ],
    trap:"不要只背三个名字。每层写清输入、输出及一个例子，才能把层次差异说完整。分类识别在不同教材的层次划分可能略有交叉，按课程术语表述。",
    variants:["Describe low-level, mid-level and high-level image tasks and how they are related.","Compare image processing, image analysis and image understanding with examples."],
    quiz:{prompt:"把道路图像中的每辆车分割出来并测量面积，最典型地属于哪一层？",options:["图像分析","纯图像显示","图像采集","只属于图像复原"],answer:0,explain:"分割和定量特征提取属于中层图像分析。去噪更典型地属于低层，解释场景含义属于高层。"},
    cloze:{text:"图像研究从像素级处理，经过特征分析，逐步走向场景的 ___ 理解。",answers:["语义","semantic","含义","意义"],explain:"高层研究关心目标是什么、场景表示什么以及应作何判断。"},
    example:"<p>医学图像：去噪（处理）→分割器官并测面积（分析）→结合医学知识解释病变（理解）。层次的关键是信息表达逐渐抽象。</p>"
  },
  {
    id:4,title:"直方图的定义与用途",topic:"灰度与直方图",
    en:"Explain the histogram and the value of it.",zh:"解释图像直方图及其用途。",
    cues:[{en:"histogram",zh:"每个灰度出现多少次"},{en:"normalized histogram",zh:"灰度概率分布"},{en:"value",zh:"用途与价值"}],
    intuition:"把所有像素按亮度分桶计数，就能快速看出图像整体偏暗、偏亮，还是灰度集中。",
    points:[
      {label:"计数定义",text:"对 L 级灰度图像，h(rₖ)=nₖ，其中 nₖ 是灰度值为 rₖ 的像素数。横轴为灰度级，纵轴为像素数。",en:"The histogram h(r_k)=n_k records the number of pixels at each gray level.",aliases:["像素数","number of pixels","n_k","nk","灰度级","gray level"]},
      {label:"归一化定义",text:"若图像尺寸为 M×N，p(rₖ)=nₖ/(MN)，所有 p(rₖ) 之和为 1，可看作灰度概率的估计。",en:"The normalized histogram p(r_k)=n_k/(MN) estimates the gray-level probability distribution and sums to one.",aliases:["归一化","normalized","概率","probability","MN","和为1"]},
      {label:"用途",text:"直方图帮助判断整体亮度、对比度与动态范围，并用于直方图均衡化、规定化和阈值分割。灰度集中在低端通常偏暗，分布较窄通常对比度较低。",en:"Histograms help assess brightness and contrast and support equalization, matching and threshold-based segmentation.",aliases:["亮度","brightness","对比度","contrast","均衡","equalization","阈值","threshold"]},
      {label:"空间信息的限制",text:"直方图不保留像素位置。两幅空间结构完全不同的图像可以有相同的直方图，因此单凭直方图不能恢复原图。",en:"A histogram does not retain spatial positions, so different images can share the same histogram.",aliases:["空间","spatial","位置","position","相同直方图","same histogram"]}
    ],
    trap:"直方图反映灰度分布，不直接告诉你目标在哪里，也不保证分布越平坦视觉效果就一定越好。",
    variants:["Define a normalized image histogram and discuss its applications.","What information does a gray-level histogram provide, and what information is lost?"],
    quiz:{prompt:"任意打乱图像所有像素的位置，但不改变像素值，直方图会怎样？",options:["完全不变","一定变平坦","一定右移","不能计算"],answer:0,explain:"每个灰度的像素数量没变，因此直方图不变；图像空间结构却可能完全不同。"},
    cloze:{text:"归一化直方图用每个灰度的像素数除以图像的 ___。",answers:["总像素数","像素总数","MN","m*n","total number of pixels"],explain:"p(rₖ)=nₖ/(MN)，归一化后总和为 1。"}
  },
  {
    id:5,title:"采样、量化与分辨率",topic:"图像基础",
    en:"Explain the sampling, quantization, spatial resolution, gray resolution and the relationship with the image quality.",
    zh:"解释采样、量化、空间分辨率、灰度分辨率与图像质量的关系。",
    cues:[{en:"sampling",zh:"坐标离散化"},{en:"quantization",zh:"幅值离散化"},{en:"spatial / gray resolution",zh:"位置细节 / 亮度细节"}],
    intuition:"用多少个位置去记录画面，是采样问题；每个位置允许记录多少种亮度，是量化问题。",
    points:[
      {label:"采样",text:"采样把连续空间坐标离散成像素网格，决定在哪些位置记录图像。视场相同且其他条件相近时，更密的采样可记录更细的空间变化。",en:"Sampling digitizes spatial coordinates into a pixel grid.",aliases:["采样","sampling","坐标","coordinates","网格","grid"]},
      {label:"量化",text:"量化把连续强度映射到有限个离散灰度级。若每像素使用 b 位，则通常有 L=2ᵇ 个可表示灰度级。",en:"Quantization digitizes intensity amplitudes into L levels; b bits can represent L=2^b levels.",aliases:["量化","quantization","强度","intensity","幅值","amplitude","2^b","2ᵇ"]},
      {label:"两种分辨率",text:"空间分辨率表示分辨细小空间结构的能力，受到采样间隔、成像光学等因素限制；灰度分辨率表示分辨细小强度差异的能力，与灰度级数、位深及噪声有关。",en:"Spatial resolution concerns fine spatial detail, whereas gray-level resolution concerns small intensity differences.",aliases:["空间分辨率","spatial resolution","灰度分辨率","gray-level resolution","位深","bit depth"]},
      {label:"质量与代价",text:"采样过稀会丢失细节或产生混叠；灰度级过少会引起量化误差和假轮廓。增加像素数或位深通常增加存储，但不能单独消除光学模糊或噪声。",en:"Insufficient sampling may cause aliasing, while coarse quantization may cause false contours; higher resolution also increases storage.",aliases:["混叠","aliasing","假轮廓","false contours","量化误差","quantization error","存储","storage"]}
    ],
    trap:"像素更多不等于必然更清晰：同样的模糊图像插值放大并不能创造已丢失的真实细节。照片上此题号有划改，平台将其作为可选补充题。",
    variants:["Distinguish spatial sampling from intensity quantization and explain their effects.","How do spatial resolution and gray-level resolution influence a digital image?"],
    quiz:{prompt:"把一幅图的灰度级从 256 级降到 4 级，但保持像素网格不变，主要改变什么？",options:["量化及灰度分辨率","采样间隔","视场大小","物体的真实尺寸"],answer:0,explain:"位置没变，允许的亮度级减少，因此改变的是量化精细程度与灰度分辨率。"},
    cloze:{text:"连续空间坐标的离散化叫采样，连续强度幅值的离散化叫 ___。",answers:["量化","quantization"],explain:"位置对应 sampling，幅值对应 quantization。"}
  },
  {
    id:6,title:"同时对比与马赫带",topic:"图像基础",
    en:"Explain the Simultaneous Contrast and Mach band effect.",zh:"解释同时对比与马赫带效应。",
    cues:[{en:"simultaneous contrast",zh:"同灰度、不同背景、不同感受"},{en:"Mach bands",zh:"边界附近的假亮带和假暗带"}],
    intuition:"眼睛感受到的亮度受周围区域影响，因此显示数值相同的两个灰块，看上去也可能不一样。",
    points:[
      {label:"同时对比",text:"相同物理灰度的小块放在不同亮度背景上，会呈现不同的感知亮度：暗背景上的灰块通常显得更亮，亮背景上的灰块通常显得更暗。",en:"In simultaneous contrast, identical gray patches appear brighter on a dark background and darker on a bright background.",aliases:["同时对比","simultaneous contrast","背景","background","相同灰度","identical"]},
      {label:"马赫带",text:"在明暗区域的过渡附近，人眼会感到亮侧更亮、暗侧更暗，产生实际灰度分布中不存在的亮带或暗带。",en:"Mach bands are perceived bright and dark bands near intensity transitions, even when those bands are absent from the actual intensity profile.",aliases:["马赫带","Mach","边界","transition","亮带","暗带"]},
      {label:"共同意义与区别",text:"两者说明视觉亮度不是像素强度的简单直接读出，而受到局部空间对比影响。前者强调背景影响目标亮度，后者强调过渡附近的对比增强。",en:"Both effects show that perceived brightness depends on local context; simultaneous contrast emphasizes background effects, while Mach bands emphasize transitions.",aliases:["感知","perceived","局部","local","对比","contrast","背景","过渡"]}
    ],
    trap:"不要把视觉错觉直接写成图像真的多出了像素条带。物理强度与感知亮度需要区分。",
    variants:["Compare simultaneous contrast with the Mach-band phenomenon.","Why may perceived brightness differ from the actual image intensity?"],
    quiz:{prompt:"相同灰度的小块，一个置于黑背景，一个置于白背景。通常哪个显得更亮？",options:["黑背景上的小块","白背景上的小块","两者物理强度必然不同","无法显示相同灰度"],answer:0,explain:"这是同时对比：感知受背景影响，尽管两个小块的像素强度相同。"},
    cloze:{text:"在灰度过渡附近感到额外的明暗条带，这种视觉现象称为 ___。",answers:["马赫带","马赫带效应","Mach bands","Mach band","Mach band effect"],explain:"马赫带强调边界附近的感知对比增强。"}
  },
  {
    id:7,title:"三种像素距离",topic:"图像基础",
    en:"The pixel P(3,4) and Q(8,10), calculate the D4, D8, De distance between P and Q.",
    zh:"计算 P(3,4) 与 Q(8,10) 的 D₄、D₈ 与欧氏距离。",
    cues:[{en:"D4 / city-block",zh:"横纵差相加"},{en:"D8 / chessboard",zh:"坐标差取最大"},{en:"Euclidean distance",zh:"勾股定理"}],
    intuition:"只能横竖走时像走街区；允许斜走时像国际象棋中的王；欧氏距离则是直接连线的长度。",
    points:[
      {label:"先求坐标差",text:"Δx=|8−3|=5，Δy=|10−4|=6。把两个非负差写出来，再代公式。",en:"The absolute coordinate differences are |Δx|=5 and |Δy|=6.",aliases:["5","6","坐标差","coordinate differences"]},
      {label:"D₄ 距离",text:"D₄(P,Q)=|Δx|+|Δy|=5+6=11。每一步只允许沿水平或垂直方向移动。",en:"The city-block distance is D4=|Δx|+|Δy|=11.",aliases:["11","city-block","曼哈顿","相加"]},
      {label:"D₈ 距离",text:"D₈(P,Q)=max(|Δx|,|Δy|)=6。先走 5 次斜步，同时消去两轴差，再走 1 步。",en:"The chessboard distance is D8=max(|Δx|,|Δy|)=6.",aliases:["6","max","最大","chessboard"]},
      {label:"欧氏距离",text:"Dₑ(P,Q)=√(Δx²+Δy²)=√61≈7.810。它是两点之间的直线距离。",en:"The Euclidean distance is De=√(5²+6²)=√61≈7.810.",aliases:["√61","sqrt(61)","7.81","欧氏","Euclidean"]}
    ],
    trap:"D₈ 是坐标差的最大值，不是相加后除以 2。这里是无障碍坐标距离，不需要额外假设中间像素的灰度。",
    variants:["Find the city-block, chessboard and Euclidean distances between (3,4) and (8,10).","Calculate three standard pixel distances for P=(3,4) and Q=(8,10)."],
    quiz:{prompt:"P=(1,2)，Q=(4,6)。按 D₄、D₈、Dₑ 的顺序，正确结果是？",options:["7，4，5","5，7，4","7，3，5","4，7，5"],answer:0,explain:"坐标差为 3、4，所以 D₄=7，D₈=4，Dₑ=√(9+16)=5。"},
    cloze:{text:"P(3,4)、Q(8,10) 的 D₄ 距离为 ___。",answers:["11","十一"],explain:"D₄=|8−3|+|10−4|=5+6=11。"},
    example:"<p>检查顺序：先求 |Δx|、|Δy|，再分别做“加法、最大值、平方和开根号”。本题 6≤√61≤11，符合 D₈≤Dₑ≤D₄，可用作快速自检。</p>"
  },
  {
    id:8,title:"三种常见灰度变换",topic:"灰度与直方图",
    en:"List three commonly used Intensity Transformations, draw the curves, write mathematical expressions, and explain the results after processing.",
    zh:"列出三种常见灰度变换，画出曲线，给出数学表达式并解释效果。",
    cues:[{en:"intensity transformations",zh:"输入灰度 r 映射到输出 s"},{en:"negative",zh:"反色"},{en:"log / power-law",zh:"对数 / 伽马变换"}],
    intuition:"每一个输入亮度 r 都经过同一条曲线得到输出亮度 s。画曲线时，横轴是输入，纵轴是输出；曲线在 s=r 上方表示变亮。",
    points:[
      {label:"负片变换",text:"8 位图可写 s=255−r；一般形式 s=(L−1)−r。若归一化到 [0,1]，则 s=1−r，曲线是从 (0,1) 到 (1,0) 的下降直线。反转明暗，适合突出暗背景中的浅色细节。",en:"The negative transform s=(L−1)−r reverses gray levels and exchanges bright and dark regions.",aliases:["负片","negative","255-r","1-r","L-1","反转"]},
      {label:"对数变换",text:"s=c ln(1+r)，c>0。若 r∈[0,1] 且要求满量程，可取 c=1/ln2。曲线递增、向下凹，扩展低灰度、压缩高灰度，常用于动态范围压缩与频谱显示。",en:"The logarithmic transform s=c ln(1+r) expands low intensities and compresses high intensities and dynamic range.",aliases:["对数","log","ln","低灰度","动态范围","dynamic range"]},
      {label:"幂律与伽马变换",text:"s=crᵞ，c>0。归一化且 c=1 时，0<γ<1 的曲线向下凹，提亮图像；γ>1 的曲线向上凸，使图像变暗；γ=1 为恒等变换。",en:"For normalized intensities, s=r^γ brightens the image when 0<γ<1 and darkens it when γ>1.",aliases:["幂律","power-law","gamma","伽马","γ","小于1","大于1"]},
      {label:"画图与说明条件",text:"三种图都标出 r、s 轴、端点和曲线形状。伽马效果的判断以归一化到 [0,1]、c=1 为前提；不同归一化或缩放约定需另行说明。",en:"Plot output s against input r, label the endpoints, and state the normalization and parameter conditions.",aliases:["曲线","curve","归一化","normalized","横轴","端点"]}
    ],
    trap:"容易背反：在 [0,1] 内，r 的平方比 r 小，所以 γ>1 变暗；平方根比 r 大，所以 γ<1 变亮。对数的“扩展”指低灰度的相对区分，不是所有位置的对比度都同时提高。",
    variants:["Describe negative, logarithmic and power-law gray-level transformations with equations and sketches.","Give three point intensity mappings and explain how their curves affect image appearance."],
    quiz:{prompt:"输入已归一化到 [0,1]。s=√r 对 r=0.25 的输出及整体效果是什么？",options:["0.5，提亮","0.0625，变暗","0.75，负片","0.25，不变"],answer:0,explain:"√0.25=0.5；此时 γ=0.5<1，非端点灰度增大，图像提亮。"},
    cloze:{text:"在 s=rᵞ、r∈[0,1] 的约定下，γ ___ 1 时图像通常变亮。",answers:["小于","<","less than","低于"],explain:"严格条件是 0<γ<1。γ=1 时保持不变。"},
    example:'<div class="curve-sketch"><svg viewBox="0 0 540 170" role="img" aria-label="负片、对数、伽马变换曲线，横轴输入r，纵轴输出s"><g fill="none" stroke="currentColor" stroke-width="1"><path d="M25 130V20 M25 130H155 M205 130V20 M205 130H335 M385 130V20 M385 130H515"/></g><g fill="none" stroke="#197967" stroke-width="3"><path d="M25 20L155 130 M205 130Q230 65 335 20 M385 130Q410 55 515 20"/></g><path d="M385 130Q470 130 515 20" fill="none" stroke="#c17a34" stroke-width="3"/><g fill="currentColor" font-size="12"><text x="30" y="153">负片 s=1−r</text><text x="205" y="153">对数 ln(1+r)/ln2</text><text x="385" y="153">伽马：γ&lt;1 / γ&gt;1</text><text x="143" y="124">r</text><text x="323" y="124">r</text><text x="503" y="124">r</text><text x="13" y="22">s</text><text x="193" y="22">s</text><text x="373" y="22">s</text></g></svg></div><p>曲线为形状示意。数值例：r=0.25 → 负片 0.75，对数约 0.322，γ=0.5 时为 0.5，γ=2 时为 0.0625。</p>'
  },
  {
    id:9,title:"直方图均衡化计算",topic:"灰度与直方图",
    en:"An image has gray levels 0–7 and normalized histogram [0.17, 0.12, 0.13, 0.05, 0.03, 0.13, 0.15, 0.22]. Calculate the result of histogram equalization.",
    zh:"对给定 8 级灰度图像计算直方图均衡化的灰度映射及输出直方图。",
    cues:[{en:"histogram equalization",zh:"先累积概率，再映射"},{en:"CDF",zh:"累计分布函数"},{en:"output histogram",zh:"合并同一输出级的概率"}],
    intuition:"按从暗到亮的累计人数分配新位置。多个原灰度映射到同一新灰度时，它们的概率必须合并。",
    points:[
      {label:"写出映射公式和取整约定",text:"L=8，CDF(k)=Σⱼ₌₀ᵏp(rⱼ)，sₖ=round[(L−1)CDF(k)]=round[7CDF(k)]。本参考答案采用四舍五入；若课堂采用其他离散化规则，需从头保持一致。",en:"Use s_k=round[(L−1)Σ(j=0…k)p(r_j)] with L=8 and state the rounding rule.",aliases:["CDF","累计","cumulative","round","7","取整"]},
      {label:"计算累计概率",text:"CDF 依次为 0.17、0.29、0.42、0.47、0.50、0.63、0.78、1.00；乘以 7 得 1.19、2.03、2.94、3.29、3.50、4.41、5.46、7.00。",en:"The cumulative probabilities are 0.17, 0.29, 0.42, 0.47, 0.50, 0.63, 0.78 and 1.00.",aliases:["0.17","0.29","0.42","0.47","0.50","0.63","0.78","1"]},
      {label:"得到灰度映射",text:"按四舍五入：0→1，1→2，2→3，3→3，4→4，5→4，6→5，7→7。注意 4.41 应取 4，所以原灰度 5 映射到 4。",en:"The rounded mapping is [1,2,3,3,4,4,5,7].",aliases:["1,2,3,3,4,4,5,7","1 2 3 3 4 4 5 7","5→4","4.41"]},
      {label:"合并输出概率并检查",text:"输出灰度 0–7 的概率为 [0,0.17,0.12,0.18,0.16,0.15,0,0.22]，总和为 1。灰度 2 与 3 的概率合并到输出 3；灰度 4 与 5 的概率合并到输出 4。",en:"The output histogram is [0,0.17,0.12,0.18,0.16,0.15,0,0.22], with probabilities added for merged levels.",aliases:["0.18","0.16","0.15","0.22","合并","merge"]}
    ],
    trap:"不能把 CDF 直接当输出直方图，也不能把映射后的灰度值当作概率。务必逐行计算，7×0.63=4.41，四舍五入为 4。",
    variants:["Equalize an eight-level image using its normalized histogram and find the new gray-level distribution.","Compute the cumulative histogram, the equalization mapping, and the resulting histogram for the given probabilities."],
    quiz:{prompt:"本题原灰度 2、3 都映射到新灰度 3。新灰度 3 的概率是多少？",options:["0.18","0.47","0.42","0.08"],answer:0,explain:"合并原概率：0.13+0.05=0.18。0.47 是累计概率，不是输出灰度 3 的概率。"},
    cloze:{text:"本题 CDF(5)=0.63，按 round[7CDF]，原灰度 5 映射为 ___。",answers:["4","四"],explain:"7×0.63=4.41，按四舍五入为 4。"},
    example:"<table><thead><tr><th>r</th><th>p(r)</th><th>CDF</th><th>7CDF</th><th>新灰度 s</th></tr></thead><tbody><tr><td>0</td><td>0.17</td><td>0.17</td><td>1.19</td><td>1</td></tr><tr><td>1</td><td>0.12</td><td>0.29</td><td>2.03</td><td>2</td></tr><tr><td>2</td><td>0.13</td><td>0.42</td><td>2.94</td><td>3</td></tr><tr><td>3</td><td>0.05</td><td>0.47</td><td>3.29</td><td>3</td></tr><tr><td>4</td><td>0.03</td><td>0.50</td><td>3.50</td><td>4</td></tr><tr><td>5</td><td>0.13</td><td>0.63</td><td>4.41</td><td>4</td></tr><tr><td>6</td><td>0.15</td><td>0.78</td><td>5.46</td><td>5</td></tr><tr><td>7</td><td>0.22</td><td>1.00</td><td>7.00</td><td>7</td></tr></tbody></table>"
  },
  {
    id:10,title:"3×3 邻域滤波计算",topic:"空间滤波",
    en:"Operate on the pixel with intensity 146: design 3×3 smoothing and sharpening operators, and calculate maximum, median and minimum filtering results.",
    zh:"以 146 为中心，用 3×3 窗口计算均值平滑、锐化、最大值、中值和最小值滤波。",
    cues:[{en:"smoothing operator",zh:"平均、抑制快速变化"},{en:"sharpening operator",zh:"中心与邻居作差"},{en:"median / maximum / minimum",zh:"排序后取中间 / 最大 / 最小"}],
    intuition:"先圈对窗口，才谈算子。146 在第 2 行第 2 列，所以它的 3×3 邻域取原矩阵前 3 列，右边第 4 列不参与。",
    points:[
      {label:"确定九个邻域值",text:"窗口为 [[168,166,157],[148,146,123],[140,121,133]]。九个值之和为 1302；第四列的 174、118、157 不在窗口内。",en:"The 3×3 window centered at 146 is [[168,166,157],[148,146,123],[140,121,133]], whose sum is 1302.",aliases:["1302","168","166","121","3×3","窗口"]},
      {label:"均值平滑",text:"可选均值核 h=(1/9)[[1,1,1],[1,1,1],[1,1,1]]。输出=1302/9=144.666…，若按最近整数存储则为 145。其他合法平滑核会得到不同答案，必须写出核。",en:"Using a 3×3 arithmetic mean kernel, the smoothed value is 1302/9≈144.667, or 145 after rounding.",aliases:["144.667","144.666","145","1/9","均值","mean"]},
      {label:"四邻域拉普拉斯锐化",text:"选锐化核 [[0,−1,0],[−1,5,−1],[0,−1,0]]，输出=5×146−166−148−123−121=172。这相当于原图减去中心系数为 −4 的拉普拉斯响应。",en:"Using the sharpening kernel [[0,−1,0],[−1,5,−1],[0,−1,0]], the output is 172.",aliases:["172","5×146","拉普拉斯","Laplacian","5,-1"]},
      {label:"次序统计滤波",text:"排序为 121、123、133、140、146、148、157、166、168。最大值=168，中值为第 5 个=146，最小值=121。",en:"Sorting the window gives maximum 168, median 146 and minimum 121.",aliases:["168","146","121","最大","中值","最小","maximum","median","minimum"]}
    ],
    trap:"原题锐化子题尾部再次写了 smoothing operation，应结合 sharpening operator 理解为计算锐化结果。设计题允许不同合法算子，但必须给出核并按该核计算；不能把 3×4 原矩阵全部用于九点滤波。",
    variants:["For the 3×3 neighborhood centered at 146, compute arithmetic mean, Laplacian sharpening and order-statistic filter outputs.","Choose a smoothing kernel and a sharpening kernel and evaluate them at the central pixel 146."],
    quiz:{prompt:"中心像素 146 的九个邻域排序后，第几个数是中值？结果是多少？",options:["第 5 个，146","第 4 个，140","第 6 个，148","九个数均值，144.667"],answer:0,explain:"奇数个值的中值是排序后第 (9+1)/2=5 个；均值与中值是不同的运算。"},
    cloze:{text:"使用给出的四邻域锐化核，中心像素 146 的输出是 ___。",answers:["172","一百七十二"],explain:"5×146−(166+148+123+121)=730−558=172。"},
    example:"<pre>原矩阵：                  以 146 为中心的窗口：\n168 166 157 174             168 166 157\n148 146 123 118             148 146 123\n140 121 133 157             140 121 133\n\n均值核 × 1/9：             锐化核：\n1 1 1                       0 −1  0\n1 1 1                      −1  5 −1\n1 1 1                       0 −1  0</pre><p>若采用八邻域锐化核（中心 9、其余 −1），输出会是 158。它也是一种合法设计，但不能与四邻域核的 172 混写。</p>"
  },
  {
    id:12,title:"均衡化为何不完全平坦",topic:"灰度与直方图",
    en:"What is histogram equalization and why in general, histogram equalization cannot produce completely flat histograms?",
    zh:"什么是直方图均衡化？为何离散图像均衡化后通常得不到完全平坦的直方图？",
    cues:[{en:"histogram equalization",zh:"CDF 灰度映射"},{en:"completely flat",zh:"每级概率完全相同"},{en:"discrete",zh:"有限像素与有限灰度"}],
    intuition:"一批相同灰度的像素被整批搬到某个新灰度。单一灰度映射无法把这一批拆开，因此很难让每个新灰度恰好得到一样多的像素。",
    points:[
      {label:"均衡化定义",text:"用输入灰度的累计分布函数构造单调变换，例如 sₖ=round[(L−1)Σⱼ₌₀ᵏp(rⱼ)]，重新分配灰度以扩展有效动态范围，常用于增强全局对比度。",en:"Histogram equalization uses a cumulative-distribution mapping to redistribute intensities and often improve global contrast.",aliases:["累计","CDF","cumulative","映射","mapping","对比度","contrast"]},
      {label:"连续理论与离散实际",text:"在满足条件的连续概率模型中，s=T(r)=CDF(r) 可得到 [0,1] 上的均匀分布。数字图像的灰度和像素数量都离散，且输出需量化，因此不能直接照搬连续结论。",en:"A continuous CDF transform can produce a uniform distribution under suitable assumptions, but digital gray levels and pixel counts are discrete.",aliases:["连续","continuous","离散","discrete","量化","quantization"]},
      {label:"多对一且不能拆分同灰度像素",text:"不同输入灰度可能量化到同一输出灰度，概率发生合并。所有相同输入灰度的像素得到相同输出值，不能通过这一点变换把它们任意拆分到多个输出级。",en:"Quantization merges input levels, and a deterministic gray-level mapping cannot split pixels of the same input level across output levels.",aliases:["多对一","合并","merge","拆分","split","相同灰度","same input"]},
      {label:"结论",text:"输出直方图一般只趋向更展开，不保证每个灰度级像素数相等。有些级可能为空；输入某一级过多时仍会保留明显峰值。",en:"The output histogram is generally more spread out, but it is not guaranteed to be perfectly flat and may contain empty levels.",aliases:["不保证","not guaranteed","空","empty","平坦","flat"]}
    ],
    trap:"不要答成“均衡化计算不精确”或“程序有误”。不完全平坦是有限、离散、确定性映射带来的结构性限制。",
    variants:["Explain why discrete histogram equalization does not normally yield a uniform histogram.","Define histogram equalization and discuss the limitations of the CDF mapping for digital images."],
    quiz:{prompt:"一幅图所有像素灰度完全相同。仅用同一个灰度映射函数做均衡化，能否让输出各灰度均匀分布？",options:["不能，同输入值仍映射到同输出值","能，CDF 自动把像素分到各级","能，只要增加位深","一定得到随机噪声"],answer:0,explain:"确定性点变换不会拆分具有相同输入灰度的像素。这是最直接的反例。"},
    cloze:{text:"离散均衡化可能把多个输入灰度映射到同一个输出灰度，这是一种 ___ 映射。",answers:["多对一","many-to-one","many to one"],explain:"灰度量化后的多对一映射合并概率，因此输出直方图通常不完全平坦。"}
  },
  {
    id:13,title:"中值滤波与均值滤波比较",topic:"空间滤波",
    en:"What are the characteristics of median filters compared to mean filters?",
    zh:"与均值滤波相比，中值滤波有哪些特性？",
    cues:[{en:"median filter",zh:"排序取中间值"},{en:"mean filter",zh:"求平均"},{en:"compared to",zh:"运算性质、噪声、边缘、限制"}],
    intuition:"九个人收入里有一个极端高值，平均数会被明显拉高，中位数通常变化较小。中值滤波同样能抵抗孤立的异常像素。",
    points:[
      {label:"运算与线性",text:"均值滤波用邻域加权平均，常见算术均值核是线性平滑滤波器；中值滤波把邻域排序后取中间值，是非线性的次序统计滤波器。",en:"A mean filter averages neighborhood values and is linear; a median filter selects the middle sorted value and is nonlinear.",aliases:["平均","average","排序","sort","非线性","nonlinear","线性","linear"]},
      {label:"脉冲噪声",text:"均值容易受极端值影响，并把孤立噪声扩散到周围；中值对少量异常值更稳健，特别适合去除椒盐噪声。前提是窗口没有被噪声大面积占据。",en:"Median filtering is robust to isolated outliers and is especially effective for salt-and-pepper noise.",aliases:["椒盐","salt-and-pepper","脉冲","impulse","异常","outlier","稳健","robust"]},
      {label:"边缘保持",text:"与同样大小的均值窗口相比，中值通常能更好地保持较大的阶跃边缘；均值把边缘两侧的值平均，容易模糊边缘。",en:"Median filtering generally preserves step edges better than mean smoothing, which averages across the boundary.",aliases:["边缘","edge","保持","preserve","模糊","blur"]},
      {label:"适用条件与限制",text:"中值仍可能去掉细线、小目标和细节，不保证对所有噪声都优于均值。对独立同分布的加性高斯噪声，均值也可能更适合；选窗口必须权衡去噪与细节。",en:"Median filtering can remove thin lines and small details, and it is not universally better for all noise types.",aliases:["细线","thin lines","细节","details","高斯","Gaussian","窗口","window"]}
    ],
    trap:"中值滤波并非“完全不模糊边缘”，也并非“总比均值好”。考试比较应包含优点和条件。",
    variants:["Compare median filtering with arithmetic mean smoothing in terms of noise removal and edge preservation.","Why is a median filter effective against impulse noise, and what limitations does it have?"],
    quiz:{prompt:"窗口值为 [10,10,10,10,255]。均值与中值分别是多少？",options:["59 与 10","10 与 59","255 与 10","10 与 255"],answer:0,explain:"均值=(40+255)/5=59；中值是排序后的第 3 个值 10。一个极端值显著影响均值。"},
    cloze:{text:"中值滤波是基于排序的 ___ 滤波器。",answers:["非线性","nonlinear","non-linear","次序统计","order-statistic","order statistic"],explain:"中值不满足一般线性叠加关系，属于非线性次序统计滤波。"}
  },
  {
    id:14,title:"二维卷积定理证明",topic:"频域滤波",
    en:"Prove the 2D convolution theorem in image processing using the 2D discrete Fourier transform formula.",
    zh:"从二维离散傅里叶变换公式证明卷积定理。",
    cues:[{en:"prove",zh:"给出定义并展开推导"},{en:"2D discrete Fourier transform",zh:"有限双重求和"},{en:"convolution theorem",zh:"空域卷积对应频域乘法"}],
    intuition:"卷积把很多平移的响应相加。傅里叶指数的加法可拆成乘法，于是双重累加恰好分成 F 与 H 两个因子。证明的关键是换元，不是只写结论。",
    points:[
      {label:"明确 DFT 约定",text:"本证明采用未归一化正变换 F(u,v)=ΣₓΣᵧf(x,y)e⁻ʲ²π⁽ᵘˣ⁄ᴹ⁺ᵛʸ⁄ᴺ⁾，逆变换带 1/(MN)。f、h 均视为 M×N 周期数组。",en:"Use an unnormalized forward DFT and an inverse DFT scaled by 1/(MN), with M×N periodic arrays.",aliases:["DFT","1/(MN)","未归一化","unnormalized","周期","periodic"]},
      {label:"写循环卷积并代入",text:"定义 g(x,y)=ΣₘΣₙf(m,n)h((x−m) mod M,(y−n) mod N)。将它代入 G(u,v) 的 DFT 公式，交换有限求和次序。",en:"Substitute the circular convolution g(x,y)=Σ_mΣ_n f(m,n)h(x−m,y−n) into the DFT and interchange the finite sums.",aliases:["循环卷积","circular convolution","代入","substitute","交换","interchange"]},
      {label:"换元与分离指数",text:"令 k=x−m、l=y−n（按周期取模），即 x=k+m、y=l+n。指数拆为 e⁻ʲ²π⁽ᵘᵐ⁄ᴹ⁺ᵛⁿ⁄ᴺ⁾·e⁻ʲ²π⁽ᵘᵏ⁄ᴹ⁺ᵛˡ⁄ᴺ⁾，内层求和正是 H(u,v)。",en:"Let k=x−m and l=y−n modulo the array size; the exponential separates into two factors and the inner sum becomes H(u,v).",aliases:["k=x-m","l=y-n","换元","substitution","指数","exponential","H(u,v)"]},
      {label:"识别两个变换得到结论",text:"内层因子 H 不再依赖 m、n，提出后剩余求和正是 F(u,v)，故 G=FH，即 f∗h ↔ FH。要得到线性卷积，应先零填充到至少 (M_f+M_h−1)×(N_f+N_h−1)。",en:"The remaining sum is F(u,v), so G(u,v)=F(u,v)H(u,v); zero-padding is required when linear rather than circular convolution is intended.",aliases:["G=FH","F(u,v)H(u,v)","卷积定理","零填充","zero-padding","线性卷积"]}
    ],
    trap:"DFT 天然对应循环卷积。课件若把 1/(MN) 放在正变换中，则普通循环卷积满足 G=MN·FH；若同时把卷积定义为除以 MN 的归一化卷积，才恢复 G=FH。考试必须让定义和系数匹配。",
    variants:["Starting from the 2D DFT definition, show that circular convolution in space becomes pointwise multiplication in frequency.","Derive G(u,v)=F(u,v)H(u,v) and state the transform normalization and boundary assumptions."],
    quiz:{prompt:"采用本题未归一化正 DFT，对两个同尺寸数组直接做 DFT、相乘、逆 DFT，默认得到什么？",options:["循环卷积","不带任何条件的线性卷积","逐点相加","中值滤波"],answer:0,explain:"有限 DFT 对应周期延拓，故默认得到循环卷积。线性卷积需足够零填充后裁取。"},
    cloze:{text:"证明中令 k=x−m、l=y−n 后，利用指数的加法公式把求和分离，最终得到 G(u,v)= ___。",answers:["F(u,v)H(u,v)","F(u,v)·H(u,v)","F(u,v)*H(u,v)","FH","F H","F×H"],explain:"此处乘法是频域对应位置的逐点乘法，采用未归一化正 DFT 与普通循环卷积约定。"},
    example:"<pre>所有求和范围均为完整 M×N 周期，索引按周期取模。\n令 E(x,y)=exp[−j2π(ux/M+vy/N)]。\n\nG = ΣₓΣᵧ [ΣₘΣₙ f(m,n)h(x−m,y−n)] E(x,y)\n  = ΣₘΣₙ f(m,n) ΣₓΣᵧ h(x−m,y−n) E(x,y)\n\n令 k=x−m，l=y−n，故 x=k+m，y=l+n：\nE(k+m,l+n)=E(m,n)E(k,l)。\n\nG = ΣₘΣₙ f(m,n)E(m,n) · ΣₖΣₗ h(k,l)E(k,l)\n  = F(u,v) H(u,v)。</pre><p>若考卷使用课件的正变换归一化约定，先注明 f∗<sub>N</sub>h=(1/MN)Σf·h，再使用同样步骤证明 DFT(f∗<sub>N</sub>h)=FH。</p>"
  },
  {
    id:15,title:"低通、高通与截止频率",topic:"频域滤波",
    en:"Explain the processing result of low-pass and high pass filters in image processing and the impact of cutoff frequency in processing.",
    zh:"解释低通、高通滤波的图像效果，以及截止频率的影响。",
    cues:[{en:"low-pass",zh:"保留缓慢变化"},{en:"high-pass",zh:"保留快速变化"},{en:"cutoff frequency",zh:"控制保留范围"}],
    intuition:"低频通常对应平缓背景，高频通常对应边缘、细节和部分噪声。截止频率像一条分界线，决定哪些成分通过。",
    points:[
      {label:"低通效果",text:"低通滤波器保留低频、衰减高频，主要用于平滑与抑制高频噪声，但也会削弱边缘和细节，使图像模糊。",en:"Low-pass filtering retains low frequencies and suppresses high frequencies, producing smoothing while blurring edges and fine detail.",aliases:["低频","low frequencies","高频","high frequencies","平滑","smoothing","模糊","blur"]},
      {label:"高通效果",text:"高通滤波器保留高频、衰减低频，突出边缘和细节，也可能放大高频噪声。纯高通输出往往失去平均亮度，常与原图相加用于锐化。",en:"High-pass filtering emphasizes edges and detail but may amplify noise; adding the high-pass response to the original image produces sharpening.",aliases:["边缘","edges","细节","detail","噪声","noise","锐化","sharpening"]},
      {label:"低通的截止变化",text:"低通截止 D₀ 越小，保留的频率范围越窄，平滑越强、模糊越明显；D₀ 越大，保留更多细节，通常更接近原图。",en:"A smaller low-pass cutoff produces stronger smoothing; a larger cutoff retains more high-frequency detail.",aliases:["截止","cutoff","越小","smaller","模糊","blur","越大","larger"]},
      {label:"高通的截止变化与形状",text:"对互补高通 H_HP=1−H_LP，D₀ 越大，抑制的低频范围越宽，仅保留更高频成分；D₀ 越小，通过范围越宽。理想滤波器突然截断易振铃，平滑过渡可减弱振铃。",en:"Increasing a high-pass cutoff removes a wider low-frequency band; an abrupt ideal cutoff may cause ringing.",aliases:["高通","high-pass","抑制","remove","振铃","ringing","过渡","transition"]}
    ],
    trap:"高频也包含有效边缘，所以不能把“去掉高频”等同于“只去噪声”。高通结果与把高通响应加回原图后的锐化结果也不是同一幅图。",
    variants:["Compare the effects of low-pass and high-pass image filtering and discuss the cutoff parameter.","How does changing the cutoff radius affect smoothing, edge detail and possible ringing?"],
    quiz:{prompt:"同一种低通滤波器，把截止半径从 40 降到 10，通常会怎样？",options:["保留频率更少，图像更模糊","保留更多细节","变成高通滤波器","一定完全消除噪声而保持边缘"],answer:0,explain:"低通半径缩小，高频成分被抑制得更多，细节和边缘也会损失。"},
    cloze:{text:"理想低通在频率边界突然截断，容易在图像边缘附近产生 ___。",answers:["振铃","ringing","振铃效应","ringing artifacts"],explain:"频域突然截断对应空间域具有振荡旁瓣的响应，边缘附近可能出现明暗波纹。"}
  },
  {
    id:16,title:"同态滤波的模型与步骤",topic:"频域滤波",
    en:"What is the theoretical basis for homomorphic filtering? And explain implementation steps of homomorphic filtering.",
    zh:"解释同态滤波的理论依据与实现步骤。",
    cues:[{en:"homomorphic filtering",zh:"乘性照明模型、先取对数"},{en:"illumination / reflectance",zh:"照明 / 反射"},{en:"log → filter → exp",zh:"对数、滤波、指数还原"}],
    intuition:"照片偏暗可能来自光照，而不是物体本身。先用对数把光照与反射的乘法拆为加法，再削弱缓慢光照变化、保留或增强物体细节。",
    points:[
      {label:"成像模型与频率假设",text:"采用简化模型 f(x,y)=i(x,y)r(x,y)，其中 i 为照明，r 为反射。照明通常缓慢变化、偏低频；反射中的边缘和纹理通常变化更快、含较多高频。这是近似假设，不是严格频率分离。",en:"Use f=i·r, with illumination usually varying slowly and reflectance detail containing relatively higher frequencies.",aliases:["照明","illumination","反射","reflectance","f=ir","低频","高频"]},
      {label:"对数把乘积变为和",text:"对正强度取 z=ln f=ln i+ln r，再做傅里叶变换 Z=DFT(z)。若存在零值，先用正下限或小 ε 处理并说明约定。",en:"Take z=ln f=ln i+ln r and compute its Fourier transform, after handling zero intensities.",aliases:["对数","log","ln","乘法变加法","零","zero"]},
      {label:"对数频域滤波",text:"计算 S=HZ。选择低频增益 γ_L<1、高频增益 γ_H>1 的平滑高频增强滤波器，以压缩光照变化、增强反射细节；常用条件 0<γ_L<1<γ_H。",en:"Apply S=HZ using a filter with low-frequency gain below one and high-frequency gain above one.",aliases:["γ_L","γ_H","低频抑制","高频增强","gain","HZ"]},
      {label:"逆变换与还原",text:"计算 s=IDFT(S)，再取 g=exp(s)，最后按显示需要调整动态范围。完整顺序：取对数→DFT→乘 H→IDFT→指数还原。",en:"Compute the inverse transform, exponentiate to return to the intensity domain, and rescale for display if needed.",aliases:["逆变换","inverse","IDFT","指数","exp","动态范围","dynamic range"]}
    ],
    trap:"直接对 f 做高通不等于同态滤波。必须先取对数，使乘性因素在变换前变为可相加的分量；也不能保证精确恢复真实反射率。",
    variants:["Explain the illumination–reflectance model behind homomorphic image enhancement and outline the algorithm.","Why does homomorphic filtering take a logarithm before frequency filtering and an exponential afterward?"],
    quiz:{prompt:"同态滤波先取对数的直接原因是什么？",options:["把照明与反射的乘积变成和","让所有像素变成正数","保证输出完全没有噪声","把图像直接变成二值图"],answer:0,explain:"ln(ir)=ln i+ln r，使两类成分可在对数域中用线性滤波调节。对数本身不保证正值。"},
    cloze:{text:"同态滤波经逆傅里叶变换后，需用 ___ 运算回到强度域。",answers:["指数","指数运算","exp","exponential","取指数"],explain:"开始取 ln，末尾用 exp 还原到强度域。"},
    example:"<p>一种常用响应为 H(D)=(γ<sub>H</sub>−γ<sub>L</sub>)[1−exp(−cD²/D₀²)]+γ<sub>L</sub>。D=0 时增益为 γ<sub>L</sub>，D 很大时趋近 γ<sub>H</sub>。例如 γ<sub>L</sub>=0.6、γ<sub>H</sub>=1.3，表示低频衰减、高频增强。</p>"
  },
  {
    id:17,title:"中值滤波的优势与步骤",topic:"空间滤波",
    en:"What are the advantages of median filters compared to mean smoothing filters? Please provide the implementation steps for median filtering.",
    zh:"说明中值滤波相对均值平滑的优势，并给出实现步骤。",
    cues:[{en:"advantages",zh:"稳健去除脉冲噪声、较好保边"},{en:"implementation steps",zh:"选窗、取值、排序、替换、滑动"},{en:"median",zh:"中间顺序统计量"}],
    intuition:"把每个小窗口里的值从小到大排队，用队伍中间的人代表中心像素。孤立的极大或极小值通常排在队伍两端，便不容易带偏输出。",
    points:[
      {label:"说明相对优势",text:"中值对极端像素值不敏感，特别适合孤立脉冲或椒盐噪声；与相同窗口的均值平滑相比，通常较好地保持阶跃边缘。它是非线性滤波，也会损失细线等小结构。",en:"Median filtering is robust to impulse noise and generally preserves edges better than mean smoothing, although it can remove fine structures.",aliases:["椒盐","salt-and-pepper","脉冲","impulse","边缘","edge","非线性","nonlinear"]},
      {label:"选窗口与边界规则",text:"选定奇数尺寸窗口，如 3×3 或 5×5；说明边界如何处理，例如镜像、复制边界或仅处理有效区域。窗口越大通常平滑更强，也更容易损失细节。",en:"Choose an odd-sized window and a boundary-handling rule such as reflection, replication or valid-region processing.",aliases:["窗口","window","3×3","5×5","边界","boundary"]},
      {label:"取值、排序与替换",text:"在原图中取出窗口全部像素值，按大小排序；若共有 K 个值且 K 为奇数，取第 (K+1)/2 个作为输出中心像素。",en:"Collect and sort the neighborhood values, then replace the center pixel by the value at rank (K+1)/2.",aliases:["排序","sort","中间","middle","替换","replace","(K+1)/2"]},
      {label:"滑动并保存新图",text:"让窗口逐像素滑动，重复上述操作，输出保存到独立数组。每个窗口都读原始输入，避免前面已更新的值污染后续计算。",en:"Slide the window over the image and store each result in a separate output array while reading neighborhoods from the original input.",aliases:["滑动","slide","原图","original","独立","separate","输出","output"]}
    ],
    trap:"中值必须先排序；取原矩阵几何中心并不是取中值。描述算法时要说明使用原图计算各窗口，并交代边界规则。",
    variants:["Describe the benefits of median filtering and give a step-by-step implementation.","How would you implement a median filter, and why is it useful for salt-and-pepper noise?"],
    quiz:{prompt:"做整幅图的标准中值滤波时，为什么通常使用独立输出数组？",options:["避免刚更新的像素进入后续原始邻域","这样才会自动变成线性滤波","因为中值必须等于均值","保证所有边缘完全不变"],answer:0,explain:"标准邻域滤波应对每个位置使用同一份输入图。原地更新会让结果依赖扫描顺序，改变运算。"},
    cloze:{text:"中值滤波取出邻域值后，先 ___，再取中间值替换中心像素。",answers:["排序","从小到大排序","sort","sorting"],explain:"中值是顺序统计量，所以先排序，再按中间的秩选值。"},
    example:"<p>3×3 邻域为 [10,10,10,10,255,10,10,10,10]：排序后第 5 个值为 10，孤立的 255 被去除。均值约为 37.22，会把这个异常值的影响扩散到输出。</p>"
  }
];
