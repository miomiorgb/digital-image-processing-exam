/* 学习参考答案；不是教师发布的标准答案。例题与原题缺失信息均显式标注。 */
window.CONTENT_B = [
  {
    id: 18, title: "图像恢复与图像增强", topic: "恢复与插值",
    en: "Explain the relationship and differences between image restoration and image enhancement?",
    zh: "解释图像恢复与图像增强的联系和区别。",
    cues: [{en:"restoration",zh:"恢复：依据退化模型估计原图"},{en:"enhancement",zh:"增强：让图像更适合观看或任务"},{en:"relationship and differences",zh:"先写共同目的，再比较依据和评价"}],
    intuition: "同一张模糊照片，可以为了看得舒服而增强对比度，也可以根据相机的模糊模型估计清晰原图。目的和依据不同，但都可能改善图像的可用性。",
    points: [
      {label:"共同目的",text:"二者都处理输入图像，以改善图像质量或使其更适合后续观察、分析与识别；某些具体技术可以重叠。",en:"Both improve image quality or usefulness for a given task, and some techniques overlap.",aliases:["改善","质量","usefulness","quality"]},
      {label:"恢复的依据",text:"恢复通常建立退化与噪声模型，例如 g=h*f+n，利用该模型和先验知识估计原图 f。逆滤波、维纳滤波是典型例子。",en:"Restoration estimates the original image using a degradation model and prior knowledge.",aliases:["退化模型","degradation model","估计原图","original image"]},
      {label:"增强的依据",text:"增强依据视觉效果或任务需要，突出感兴趣的信息，通常不要求显式退化模型；如对比度拉伸、直方图均衡化和锐化。",en:"Enhancement emphasizes useful information according to visual or task requirements, usually without an explicit degradation model.",aliases:["视觉","任务","visual","task","不要求"]},
      {label:"评价区别",text:"恢复常用模型误差或重建误差评价，增强更依赖视觉感受和任务效果。二者不是绝对的主观/客观二分，也不保证任一方法都改善所有任务。",en:"Restoration is often judged by reconstruction accuracy, while enhancement is often judged by visual or task performance.",aliases:["重建","误差","accuracy","performance"]}
    ],
    trap: "不要把恢复写成单纯的‘使图像好看’，也不要说增强一定需要退化模型。恢复也可能依赖主观先验，增强也可以用客观任务指标评价。",
    variants:["Compare model-based image restoration with image enhancement.","How do the goals and assumptions of restoration differ from those of enhancement?"],
    quiz:{prompt:"已知相机的运动模糊核，并利用该模型估计清晰原图，最符合哪一种处理？",options:["图像恢复","只属于直方图统计","图像编码","只能称为图像增强"],answer:0,explain:"依据已知退化模型估计原图，是图像恢复的典型思路。"},
    cloze:{text:"Image restoration usually uses a ___ model to estimate the original image.",answers:["degradation","退化"],explain:"题眼是 restoration ↔ degradation model。"}
  },
  {
    id:20, title:"最近邻与双线性插值", topic:"恢复与插值",
    en:"Redo the exercises on nearest neighbor interpolation and bilinear interpolation in class.",
    zh:"重新完成课上的最近邻插值和双线性插值例题。",
    missing:"原文只引用课堂例题，没有给出原图数据、目标坐标或坐标映射约定。下方是新编方法例题，不能冒充课堂原题的数值答案。",
    cues:[{en:"nearest neighbor",zh:"最近邻：取最近一个像素"},{en:"bilinear interpolation",zh:"双线性：四邻点按距离加权"},{en:"coordinate mapping",zh:"先确定输出点对应原图的哪个坐标"}],
    intuition:"最近邻像挑一个最近的座位坐下；双线性像站在四个角之间，离某个角越近，那个角的灰度对结果影响越大。",
    points:[
      {label:"先做坐标映射",text:"先把输出像素映射回原图的连续坐标 (x,y)。缩放题须交代使用像素中心对齐还是端点对齐，边界如何处理；不同约定会改变数值。",en:"First map each output pixel to a continuous coordinate in the input image, using a stated coordinate convention.",aliases:["坐标","映射","coordinate","map"]},
      {label:"最近邻",text:"对原图坐标取最近的整数位置，复制该像素的值。速度快，不产生新的灰度级，但放大时可能出现块状或锯齿。等距时要说明舍入规则。",en:"Nearest-neighbor interpolation copies the closest pixel value; it is fast but may produce blocky or jagged edges.",aliases:["最近","复制","closest","copies","取整"]},
      {label:"双线性公式",text:"令 x=x₀+α、y=y₀+β，0≤α,β≤1。设四角为 f₀₀,f₁₀,f₀₁,f₁₁，则 f=(1−α)(1−β)f₀₀+α(1−β)f₁₀+(1−α)βf₀₁+αβf₁₁。四个权重非负且和为1。",en:"Bilinear interpolation uses a weighted average of four surrounding pixels, with nonnegative weights that sum to one.",aliases:["四","权重","weighted","four","α"]},
      {label:"计算与效果",text:"可以先沿 x 方向做两次线性插值，再沿 y 方向做一次。双线性通常比最近邻平滑，但会软化边缘，不能恢复原图中不存在的真实细节。",en:"Interpolate along one axis and then the other; the result is smoother but may blur edges.",aliases:["平滑","模糊","smoother","blur","两次"]}
    ],
    example:"<p><strong>新编例题：</strong>原图四角 f(0,0)=10，f(1,0)=20，f(0,1)=30，f(1,1)=40，求 (0.25,0.5)。</p><p>上边：0.75×10+0.25×20=12.5；下边：0.75×30+0.25×40=32.5；再沿 y：0.5×12.5+0.5×32.5=<strong>22.5</strong>。</p><p>最近邻在 y=0.5 发生等距。若约定半整数向较大坐标取整，则取 (0,1)，结果30；若向较小坐标取整则为10。计算前写清规则。</p>",
    trap:"双线性不是不分距离的四点平均。只有 α=β=0.5 时四个权重才都是1/4。也不要把四舍五入像素坐标和最终灰度取整混在一起。",
    variants:["Compute an interpolated pixel using the nearest-neighbor and bilinear methods.","How does a four-neighbor weighted interpolation differ from copying the nearest sample?"],
    quiz:{prompt:"四角灰度为10、20、30、40，在正中心的双线性插值为多少？",options:["10","20","25","40"],answer:2,explain:"正中心 α=β=0.5，四角各占1/4，结果 (10+20+30+40)/4=25。"},
    cloze:{text:"Bilinear interpolation uses ___ surrounding pixels.",answers:["four","4","四","四个"],explain:"题眼是 bilinear ↔ four surrounding pixels ↔ weighted average。"},
    sources:["https://www.mathworks.com/help/matlab/ref/imresize.html"]
  },
  {
    id:21,title:"光与颜料的三原色",topic:"彩色图像",
    en:"What are the three basic colors of light and their complementary colors? What happens when each primary is mixed with its complement? Answer the same questions for pigments.",
    zh:"光与颜料各有哪三原色、对应的互补色？原色与其互补色混合分别得到什么？",
    cues:[{en:"light / additive",zh:"光：RGB，加色"},{en:"pigments / subtractive",zh:"理想颜料：CMY，减色"},{en:"complementary colors",zh:"互补：补齐缺少的成分"}],
    intuition:"发光的屏幕把光加起来，越加越接近白；理想颜料通过吸收光来混色，吸收范围越多，越接近黑。",
    points:[
      {label:"光的三原色",text:"光的加色三原色为红 Red、绿 Green、蓝 Blue，即 RGB。标准化强度下 R+G=黄，G+B=青，B+R=品红。",en:"The additive primaries of light are red, green and blue: RGB.",aliases:["RGB","红绿蓝","red","green","blue"]},
      {label:"光的互补关系",text:"红的互补色是青 Cyan，绿的互补色是品红 Magenta，蓝的互补色是黄 Yellow。适当强度的原色光加上对应互补色光，三通道补齐，得到白光。",en:"Red, green and blue have cyan, magenta and yellow as complements; each primary plus its complement gives white light.",aliases:["青","品红","黄","white","白","cyan"]},
      {label:"理想颜料三原色",text:"印刷的理想减色三原色为青 Cyan、品红 Magenta、黄 Yellow，即 CMY。青主要吸收红，品红主要吸收绿，黄主要吸收蓝。",en:"The ideal subtractive primaries are cyan, magenta and yellow: CMY.",aliases:["CMY","减色","subtractive","吸收"]},
      {label:"颜料互补关系与结果",text:"青的互补色为红，品红的互补色为绿，黄的互补色为蓝。理想减色模型中，原色颜料与对应互补色颜料混合吸收全部三种光，得到黑色；实际油墨常需黑色 K 改善暗部。",en:"The complements of cyan, magenta and yellow are red, green and blue; ideal complementary pigments combine to give black.",aliases:["黑","black","理想","互补"]}
    ],
    trap:"题干若出现 light，要答 RGB、加色、white；出现 pigments，要答理想 CMY、减色、black。不要把绘画中的传统红黄蓝约定代入数字图像教材的 CMY 模型。",
    variants:["Contrast additive RGB mixing with subtractive CMY mixing.","List each primary-complement pair and state the ideal mixing result for light and pigments."],
    quiz:{prompt:"在理想加色模型中，红光的互补色是什么？二者适当混合得到什么？",options:["绿色；黄色","青色；白色","黄色；黑色","品红；蓝色"],answer:1,explain:"青光包含绿与蓝，和红光共同组成 RGB 三个分量，得到白光。"},
    cloze:{text:"In the additive model, a primary color and its complement combine to produce ___ light.",answers:["white","白","白色"],explain:"加色补齐 RGB 得白；减色颜料的理想结果为黑。"}
  },
  {
    id:22,title:"RGB 与 HSI 模型",topic:"彩色图像",
    en:"Try to explain the RGB color model and the HSI color model.",
    zh:"解释 RGB 和 HSI 颜色模型。",
    cues:[{en:"RGB",zh:"Red、Green、Blue，三种光的分量"},{en:"HSI",zh:"Hue、Saturation、Intensity"},{en:"color model",zh:"用哪些坐标描述同一种颜色"}],
    intuition:"RGB 像调屏幕的三盏灯；HSI 像描述‘什么颜色、有多鲜艳、有多亮’，更接近人的语言。两者可以表示同一个像素，只是坐标不同。",
    points:[
      {label:"RGB",text:"RGB 用红、绿、蓝三个加色分量描述颜色，常用立方体表示。归一化时每个分量在[0,1]，(0,0,0)为黑、(1,1,1)为白，R=G=B 是灰度轴。",en:"RGB represents a color by red, green and blue components in an additive color cube.",aliases:["红绿蓝","additive","cube","三分量","RGB"]},
      {label:"HSI 三个分量",text:"H 色调表示颜色类别，可用角度表示；S 饱和度表示掺入白色的程度，越低越接近灰；I 强度表示亮度成分。它们分别回答什么颜色、多纯、多亮。",en:"HSI describes hue, saturation and intensity, corresponding to color type, purity and brightness.",aliases:["hue","saturation","intensity","色调","饱和度","强度"]},
      {label:"常用强度与饱和度公式",text:"对非负 RGB，常见 HSI 定义为 I=(R+G+B)/3；当 R+G+B>0 时，S=1−3min(R,G,B)/(R+G+B)。灰色 R=G=B 时 S=0，此时色调没有唯一意义；黑色也需单独约定。",en:"In a common HSI definition, intensity is the average of R, G and B; hue is undefined for achromatic colors.",aliases:["平均","average","S=0","未定义","undefined"]},
      {label:"用途与联系",text:"RGB 适合摄像、显示与硬件表达；HSI 便于分开处理强度和颜色，例如主要修改 I 而尽量保留 H、S。HSI 不等于 HSV 或 HSL，转换与输出还需注意 RGB 可表示范围。",en:"RGB is convenient for acquisition and display, while HSI helps separate intensity processing from color information.",aliases:["显示","display","分离","separate","强度"]}
    ],
    trap:"HSI 中 I 通常是 RGB 平均值；HSV 的 V 是最大通道，两者不要混用。灰色的 H 不是一个物理上唯一确定的颜色角度。",
    variants:["What do the three coordinates of RGB and HSI mean?", "Why is HSI useful when adjusting image intensity while preserving color?"],
    quiz:{prompt:"在常用 HSI 定义中，RGB=(0.3,0.6,0.9) 的 I 为多少？",options:["0.3","0.6","0.9","1.8"],answer:1,explain:"I=(R+G+B)/3=1.8/3=0.6；最大通道0.9是 HSV 中 V 的定义。"},
    cloze:{text:"The letter S in HSI stands for ___.",answers:["saturation","饱和度"],explain:"完整记住 Hue、Saturation、Intensity 及各自中文含义。"}
  },
  {
    id:23,title:"伪彩色图像",topic:"彩色图像",
    en:"What is a pseudo-color image? Give methods of generating a pseudo-color image from a gray image.",
    zh:"什么是伪彩色图像？怎样从灰度图生成伪彩色图？",
    cues:[{en:"pseudo-color",zh:"把灰度或测量值人为映射到颜色"},{en:"intensity slicing",zh:"灰度分层，每段一种颜色"},{en:"gray-level to color transformation",zh:"连续映射为 R、G、B"}],
    intuition:"温度图把较低温度画成蓝、较高温度画成红。颜色帮助人分辨数据差异，但不代表被拍物体本来的真实颜色。",
    points:[
      {label:"定义与目的",text:"伪彩色是按人为规定的映射，把灰度值或其他单通道测量值赋成颜色，以突出层次、便于观察和解释。它不恢复物体真实光谱颜色。",en:"Pseudo-color assigns artificial colors to gray levels to improve visualization and interpretation.",aliases:["人为","映射","artificial","gray","可视化"]},
      {label:"灰度分层",text:"把灰度轴分成若干区间，每个区间指定一种颜色；像素根据所在区间着色，也称 intensity slicing 或 density slicing。",en:"Intensity slicing divides the gray-level range into intervals and assigns one color to each interval.",aliases:["区间","分层","slicing","intervals"]},
      {label:"连续灰度到彩色变换",text:"设计三个映射 R=Tᵣ(r)、G=Tɢ(r)、B=Tᵦ(r)，或用查找表 LUT 把每个灰度映射为 RGB 三元组。映射可连续变化以减少分层突变。",en:"Gray-level-to-color transformation maps each intensity to RGB components using three functions or a lookup table.",aliases:["RGB","LUT","三个","lookup","transformation"]},
      {label:"解释边界",text:"应保留色标说明数值含义。同一灰度输入在确定映射下得到同一颜色；颜色只是重新编码现有信息，不能凭空增加原始测量信息。",en:"A color legend explains the mapping; pseudo-color changes the display, not the original measurement information.",aliases:["色标","legend","信息","mapping"]}
    ],
    example:"<p><strong>新编例子：</strong>对8位灰度，0–84映射蓝、85–169映射绿、170–255映射红。灰度120会显示绿色。这是分层映射，不是找回物体本来的绿色。</p>",
    trap:"伪彩色不等于给黑白照片推测真实颜色。写方法时要给出‘分层着色’和‘灰度到 RGB 变换’两个可操作方案。",
    variants:["Describe intensity slicing and RGB mapping for pseudo-color display.","How can colors be assigned to a monochrome image to make intensity differences easier to see?"],
    quiz:{prompt:"把灰度0–84设为蓝色、85–169设为绿色、170–255设为红色，这属于什么方法？",options:["图像恢复","灰度分层伪彩色","Huffman编码","最近邻插值"],answer:1,explain:"将灰度范围划成若干区间再赋色，正是 intensity slicing。"},
    cloze:{text:"Assigning one color to each gray-level interval is called intensity ___.",answers:["slicing","分层"],explain:"intensity slicing 是本题识别度很高的核心短语。"}
  },
  {
    id:25,title:"压缩的保真度评价",topic:"图像压缩",
    en:"What are the commonly used fidelity criteria for evaluating image compression? Explain them separately.",
    zh:"评价图像压缩常用哪些保真度准则？分别说明。",
    cues:[{en:"fidelity criteria",zh:"重建图与原图有多接近"},{en:"objective / subjective",zh:"数值误差 / 人的观察评分"},{en:"MSE / RMSE / SNR / PSNR",zh:"误差越小、信噪比越大通常越好"}],
    intuition:"压缩率回答文件省了多少空间；保真度回答重建图失去了多少信息、看起来受了多大影响。这是两个不同问题。",
    points:[
      {label:"客观误差准则",text:"设原图 f、重建图 g、像素数 MN。MSE=(1/MN)Σ[f(x,y)−g(x,y)]²；RMSE=√MSE。二者越小表示逐像素误差越小，RMSE 与灰度值同单位。",en:"MSE is the mean squared reconstruction error, and RMSE is its square root; lower values indicate smaller pixel errors.",aliases:["MSE","RMSE","均方","平方","squared"]},
      {label:"信噪比 SNR",text:"将重建误差 e=f−g 看作噪声，可定义能量比 SNR=Σf²/Σe²；其分贝值为10log₁₀(SNR)。RMS信噪比是该能量比的平方根。题目计算时要注明所用定义。",en:"SNR compares signal energy with reconstruction-error energy; its decibel value is ten times the base-ten logarithm of the energy ratio.",aliases:["能量","energy","SNR","信噪比"]},
      {label:"峰值信噪比 PSNR",text:"PSNR=10log₁₀(MAX²/MSE)，单位 dB；8位无符号图像 MAX=255。相同动态范围下 PSNR 越大通常失真越小；MSE=0 时为正无穷。",en:"PSNR equals 10 log10 of MAX squared divided by MSE; a larger PSNR generally indicates lower distortion at the same intensity range.",aliases:["PSNR","MAX","255","峰值","10log"]},
      {label:"主观准则与限制",text:"让观察者在规定条件下给重建图的质量或失真打分。人的观感受结构、纹理、观看距离等影响，MSE相同的图像也可能看起来不同，因此客观数值不能完全代替主观评价。",en:"Subjective criteria use human quality ratings; objective error measures do not fully predict perceived quality.",aliases:["主观","观察者","human","subjective","感知"]}
    ],
    example:"<p><strong>新编例题：</strong>8位图像的 MSE=100，则 RMSE=10，PSNR=10log₁₀(255²/100)≈<strong>28.13 dB</strong>。若另一压缩结果 MSE=25，则 PSNR≈34.15 dB。</p>",
    trap:"entropy、average code length 和 compression ratio 衡量编码与数据量，不是重建保真度。不要把 SNR 的能量比与分贝数、或它的平方根混用。",
    variants:["Distinguish objective and subjective measures of image-compression fidelity.","Define reconstruction error, SNR and PSNR for a compressed image."],
    quiz:{prompt:"对于相同位深和动态范围的两张重建图，MSE从100降为25，PSNR会怎样？",options:["增加约6.02 dB","减少约6.02 dB","保持不变","变为原来的四分之一"],answer:0,explain:"PSNR增加10log₁₀(100/25)=10log₁₀4≈6.02 dB。"},
    cloze:{text:"The square root of MSE is called ___.",answers:["RMSE","root mean square error","均方根误差"],explain:"MSE是均方误差，RMSE是均方根误差。"},
    sources:["https://www.mathworks.com/help/images/ref/psnr.html","https://www.mathworks.com/help/signal/ref/snr.html","https://www.mathworks.com/help/wavelet/ref/measerr.html"]
  },
  {
    id:26,title:"Huffman 编码与四个指标",topic:"图像压缩",
    en:"What is the basic idea of Huffman coding? Provide the computing methods and meanings of entropy, average code length, coding efficiency and redundancy.",
    zh:"说明 Huffman 编码思想，以及熵、平均码长、编码效率、冗余度的含义和计算方法。",
    cues:[{en:"Huffman coding",zh:"每次合并两个最小概率节点"},{en:"entropy / average code length",zh:"理论平均信息量 / 实际平均比特数"},{en:"efficiency / redundancy",zh:"H/L̄ / 1−H/L̄"}],
    intuition:"常见符号配短码，少见符号配长码。在能逐符号无歧义解码的前缀码中，Huffman用一棵树尽量缩短平均码长。",
    points:[
      {label:"构造步骤",text:"统计符号概率，每次取最小的两个节点合并，父节点概率为二者之和；重复直到只剩根。给每处分支标0、1，从根到叶的路径是码字。得到前缀码；0/1互换和概率并列可产生不同但同样有效的码表。",en:"Repeatedly merge the two least probable nodes, label branches zero and one, and read each codeword from the root to its leaf.",aliases:["最小","合并","two","merge","least"]},
      {label:"信息熵",text:"H=−Σpᵢlog₂pᵢ，单位 bit/symbol；pᵢ=0 的项按0计。它表示信源每符号的平均信息量，是相应二元无失真编码平均码长的理论下界。",en:"Entropy H equals minus the sum of p log2 p and measures average information in bits per symbol.",aliases:["熵","entropy","log","信息量","下界"]},
      {label:"平均码长",text:"L̄=Σpᵢlᵢ，其中 lᵢ 是第i个码字的比特数。二元 Huffman 对给定概率的逐符号前缀编码具有最小平均码长，通常满足 H≤L̄<H+1（非退化信源）。",en:"The average code length is the probability-weighted sum of codeword lengths, Lbar = sum of p times l.",aliases:["平均码长","weighted","概率","码长","p"]},
      {label:"效率与冗余",text:"编码效率 η=H/L̄，通常写成百分数；相对编码冗余 r=1−η。若问每符号多用多少比特，则为 L̄−H，单位bit/symbol。不要混淆这两种冗余量。",en:"Coding efficiency is H divided by Lbar; relative redundancy is one minus the efficiency.",aliases:["H/L","效率","1−","redundancy","efficiency"]}
    ],
    example:"<p><strong>新编完整例题：</strong>p(A,B,C,D)=(0.4,0.3,0.2,0.1)。合并0.1+0.2=0.3，再合并0.3+0.3=0.6，最后0.4+0.6=1。一种码表：A=0，B=10，C=110，D=111。</p><p>L̄=0.4×1+0.3×2+0.2×3+0.1×3=<strong>1.9 bit/symbol</strong>；H≈1.84644；η≈1.84644/1.9=<strong>97.18%</strong>；r≈<strong>2.82%</strong>；L̄−H≈0.05356 bit/symbol。</p>",
    trap:"码字本身不唯一，比较的是前缀可解码性和平均码长；熵不是把全部码长直接相加。编码效率 H/L̄ 不等于压缩率，也不要把百分数再当小数相减。",
    variants:["Construct a variable-length prefix code by repeatedly merging the smallest probabilities.","How are source entropy, expected code length and coding redundancy related in Huffman coding?"],
    quiz:{prompt:"某信源 H=1.8 bit/symbol，平均码长L̄=2，编码效率和相对冗余分别是多少？",options:["90%，10%","10%，90%","111.1%，−11.1%","1.8%，2%"],answer:0,explain:"η=H/L̄=0.9=90%；r=1−η=10%。"},
    cloze:{text:"At each step, Huffman coding merges the two nodes with the ___ probabilities.",answers:["smallest","lowest","least","最小"],explain:"记住 two smallest probabilities，不是先合并最大的两个。"},
    sources:["https://www.cs.cmu.edu/~15750/notes/jason-lec19.pdf","https://ocw.mit.edu/courses/18-200-principles-of-discrete-applied-mathematics-spring-2024/mit18_200_s24_lec19.pdf"]
  },
  {
    id:27,title:"预测编码为什么有效",topic:"图像压缩",
    en:"What is the basic idea of predictive coding? Why is quantizing and encoding prediction errors more efficient than directly quantizing and encoding raw data?",
    zh:"预测编码的基本思想是什么？为什么编码预测误差通常比直接编码原始数据有效？",
    cues:[{en:"predictive coding",zh:"用已知邻点预测当前像素"},{en:"prediction error / residual",zh:"原值减预测值"},{en:"spatial redundancy",zh:"相邻像素相关，存在空间冗余"}],
    intuition:"一排灰度100、101、100、102，大体都在100附近。已知道前一个数后，只需记录它们相差多少，残差大多靠近0，适合用短码表示。",
    points:[
      {label:"利用相关性预测",text:"图像相邻像素通常相关。按确定扫描顺序，用双方都能获得的已编码/已重建邻点预测当前像素，预测器记为 f̂(x,y)。",en:"Predict each pixel from previously encoded or reconstructed neighbors to exploit spatial correlation.",aliases:["邻","预测","correlation","neighbors","空间"]},
      {label:"编码残差与重建",text:"计算残差 e=f−f̂，对残差进行熵编码；解码端用相同邻点和预测规则得到同一 f̂，再将解码残差相加重建。首像素、边界和预测器规则也须能确定。",en:"Encode the prediction error e = f minus the predicted value; reconstruct by adding the decoded error to the same prediction.",aliases:["残差","error","相加","重建","subtract"]},
      {label:"节省比特的原因",text:"预测准确时残差更集中在0附近、方差通常较小、分布更不均匀，常使残差的边缘熵更低，便于熵编码。变小的是统计冗余；可逆预测变换没有删除原图信息。",en:"A good predictor produces errors concentrated near zero, often reducing their variance and marginal entropy and improving entropy coding.",aliases:["零","集中","熵","entropy","redundancy","方差"]},
      {label:"有损与无损",text:"不量化且精确编码残差可以无损；对残差量化则通常有损。量化预测编码须使用解码端同样的重建样本反馈预测，避免编码端与解码端预测失配；效果取决于预测器和图像。",en:"Exact residual coding can be lossless; quantizing the residual generally introduces loss, and both sides must use matching predictions.",aliases:["无损","量化","lossless","quantiz","一致"]}
    ],
    example:"<p><strong>新编例子：</strong>像素100、101、100、102，首值单独记录，其后用前一像素预测，残差为1、−1、2。接收端从100依次相加可精确恢复。残差的可能数值范围仍可含负数，不能仅凭‘数值小’断言一定省比特。</p>",
    trap:"‘预测编码必然有损’不成立；损失常来自量化。‘残差一定比原图范围小’也不成立，差值可能为负且范围更宽，关键在实际概率分布和可压缩性。",
    variants:["Explain how coding residuals removes interpixel redundancy.","Describe the encoder and decoder of predictive image coding and distinguish lossless from lossy prediction."],
    quiz:{prompt:"真实像素为150，双方预测值为147。若精确传输残差3，解码值为多少？",options:["3","147","150","153"],answer:2,explain:"重建值=预测值+残差=147+3=150，精确残差可实现无损重建。"},
    cloze:{text:"The difference between an actual pixel and its predicted value is the prediction ___.",answers:["error","residual","误差","残差"],explain:"prediction error 和 residual 是本题的核心同义表达。"},
    sources:["https://cmp.felk.cvut.cz/~drbohlav/TeachPres/imagecompression-v2.pdf"]
  },
  {
    id:28,title:"图像分割的五个条件",topic:"分割与描述",
    en:"Divide an image into multiple subregions R1, R2, ..., Rn. What are the characteristics of these subregions?",
    zh:"将图像分成多个子区域 R₁、R₂、…、Rₙ，这些区域应满足哪些条件？",
    cues:[{en:"subregions / segmentation",zh:"分割是对整幅图像作区域划分"},{en:"connected / disjoint",zh:"区域内部连通，区域之间不重叠"},{en:"homogeneous predicate",zh:"区域内部满足同质性准则"}],
    intuition:"把一张地图分成完整的行政区：不能漏地、不能一块地归两个区、每个区内部要连通，还要有一个划分标准。相邻两区若合在一起仍满足同一标准，就还没分到合适程度。",
    points:[
      {label:"完整覆盖",text:"所有区域的并集等于整个图像区域 R：⋃ᵢRᵢ=R。每个像素都被划分，不能遗漏。",en:"The union of all subregions equals the entire image region.",aliases:["覆盖","并集","union","entire","遗漏"]},
      {label:"互不重叠",text:"当 i≠j 时，Rᵢ∩Rⱼ=∅。一个像素只能属于一个子区域。",en:"Different subregions are disjoint: their intersection is empty.",aliases:["不重叠","交集","disjoint","empty","互斥"]},
      {label:"区域连通",text:"每个 Rᵢ 都是连通区域：区域内任意两像素间有完全位于该区域内的路径。需要事先规定4连通、8连通等邻接规则。",en:"Each subregion is connected under a specified connectivity rule.",aliases:["连通","connected","路径","connectivity"]},
      {label:"区域内同质",text:"对预先规定的同质性谓词 P，每个区域满足 P(Rᵢ)=TRUE，例如灰度、颜色或纹理符合给定标准。‘同质’不必是每个像素数值完全相等。",en:"Every subregion satisfies the chosen homogeneity predicate.",aliases:["同质","谓词","TRUE","homogeneity","predicate"]},
      {label:"相邻区域不能再合并",text:"对不同且相邻的 Rᵢ、Rⱼ，P(Rᵢ∪Rⱼ)=FALSE。即它们合并后不再满足同质性要求，防止无意义的过度细分。",en:"The union of any two adjacent subregions fails the homogeneity predicate.",aliases:["相邻","合并","FALSE","adjacent","union"]}
    ],
    trap:"‘相邻区域合并不再同质’针对相邻区域，别漏掉 adjacent。‘连通’是空间路径条件，‘同质’是灰度或特征条件，两者不能互相代替。",
    variants:["State the five conditions for a complete image segmentation.","What coverage, connectivity and homogeneity requirements must a partition of an image satisfy?"],
    quiz:{prompt:"一个分割结果中，同一像素同时属于R₁与R₂，它首先违反哪个条件？",options:["完整覆盖","互不重叠","区域内部连通","灰度必须相等"],answer:1,explain:"R₁∩R₂不为空，违反分割区域的互斥性。"},
    cloze:{text:"For two adjacent final regions, the homogeneity predicate of their union should be ___.",answers:["false","FALSE","假","不成立"],explain:"每个区域自身满足 P，但相邻最终区域合并后不满足 P。"},
    sources:["https://www.cs.auckland.ac.nz/courses/compsci773s1c/lectures/ImageProcessing-html/topic3.htm"]
  },
  {
    id:29,title:"一阶与二阶微分检测边缘",topic:"分割与描述",
    en:"What is the theoretical basis for edge detection using first-order and second-order differential operators? Provide operator templates for each.",
    zh:"用一阶、二阶微分检测边缘的理论依据是什么？分别给出算子模板。",
    cues:[{en:"first-order / gradient",zh:"一阶：检测灰度变化强度"},{en:"second-order / Laplacian",zh:"二阶：检测变化率的变化"},{en:"operator templates",zh:"答案必须写出模板"}],
    intuition:"沿图像走过一条边，灰度会快速变化。一阶导数告诉你‘变得有多快’，二阶导数告诉你‘这个变化速度在怎样改变’。",
    points:[
      {label:"边缘的理论依据",text:"边缘附近灰度通常快速变化，微分能突出这种变化；平坦区域导数接近0。一阶常通过梯度幅值的局部极大或阈值检测边缘；对平滑阶跃边，二阶响应可在边缘附近产生过零。",en:"Edges correspond to rapid intensity changes; first derivatives have strong responses, while second derivatives can locate zero crossings near smoothed step edges.",aliases:["快速","变化","gradient","zero","过零","导数"]},
      {label:"一阶梯度",text:"∇f=(Gₓ,Gᵧ)，幅值 |∇f|=√(Gₓ²+Gᵧ²)，常用 |Gₓ|+|Gᵧ|近似。梯度方向沿灰度增长最快方向，与局部边缘切线大致垂直。",en:"The gradient magnitude measures edge strength, and its direction is approximately normal to the local edge.",aliases:["幅值","magnitude","梯度","Gx","方向"]},
      {label:"一阶模板示例",text:"Sobel 水平导数模板 Gₓ=[−1 0 1; −2 0 2; −1 0 1]，垂直导数模板 Gᵧ=[−1 −2 −1; 0 0 0; 1 2 1]。先各自计算再组合幅值；Gₓ检测沿x的变化，常突出垂直边。",en:"Sobel uses two three-by-three masks to estimate horizontal and vertical intensity derivatives.",aliases:["Sobel","模板","水平","垂直","mask"]},
      {label:"二阶模板与限制",text:"拉普拉斯 ∇²f=∂²f/∂x²+∂²f/∂y²，模板可用 [0 1 0; 1 −4 1; 0 1 0]。它不直接给边缘方向，且对噪声敏感，通常先平滑；过零还需足够的响应变化幅度，不能把所有0值都当边缘。",en:"The Laplacian sums second derivatives; smoothing and a response threshold help prevent noise and insignificant zero crossings from being detected as edges.",aliases:["Laplacian","拉普拉斯","噪声","noise","二阶","平滑"]}
    ],
    example:"<p><strong>可直接写到答卷的模板：</strong></p><pre>Sobel Gx       Sobel Gy       Laplacian\n-1  0  1      -1 -2 -1       0  1  0\n-2  0  2       0  0  0       1 -4  1\n-1  0  1       1  2  1       0  1  0</pre><p>坐标轴方向或卷积/相关约定不同，模板整体变号可能仍正确；检测幅值和过零时必须保持同一约定。</p>",
    trap:"一阶找强响应，二阶可找过零；‘拉普拉斯等于0就一定是边缘’是错的，平坦区域也可能处处为0。别只写名字不写模板。",
    variants:["Explain gradient-based and Laplacian-based edge detection and give suitable masks.","Why do derivatives reveal image edges, and how do first and second derivatives differ?"],
    quiz:{prompt:"对平滑阶跃边缘，下面哪个描述最合适？",options:["一阶响应一定为0","二阶的所有0值都是边缘","一阶幅值较强，二阶可在边缘附近过零","微分会自动消除全部噪声"],answer:2,explain:"微分突出变化，一阶产生强响应；二阶可产生过零，但还需平滑与幅度条件来排除无意义响应。"},
    cloze:{text:"The Laplacian is a ___-order differential operator.",answers:["second","2","二","二阶"],explain:"gradient 是一阶，Laplacian 是二阶。"},
    sources:["https://docs.opencv.org/3.4.7/d2/d2c/tutorial_sobel_derivatives.html","https://docs.opencv.org/3.4.9/d5/db5/tutorial_laplace_operator.html"]
  },
  {
    id:30,title:"区域生长的思路与实际问题",topic:"分割与描述",
    en:"What is the basic idea of region growing? What problems need to be solved in practical applications?",
    zh:"区域生长的基本思想是什么？实际应用中需要解决哪些问题？",
    cues:[{en:"region growing",zh:"从种子出发，把相似邻点逐步并入"},{en:"seed / similarity / connectivity",zh:"种子、相似判据、邻接规则"},{en:"stopping criterion",zh:"何时停止，怎样防止越界泄漏"}],
    intuition:"先在目标内部点一个种子，再像墨水扩散一样检查邻点；只有满足相似条件的像素才吸收进来。与墨水不同，它应在目标边界停下。",
    points:[
      {label:"基本思想",text:"区域生长是基于相似性的分割方法：从一个或多个种子开始，反复把满足条件的相邻像素并入区域，使区域逐步扩大。",en:"Region growing starts from seeds and repeatedly adds neighboring pixels that satisfy a similarity criterion.",aliases:["种子","相邻","相似","seeds","neighboring"]},
      {label:"种子与相似性",text:"选择有代表性的种子和区域数；定义灰度、颜色、纹理等相似判据。可比较像素与种子或当前区域均值的差，并明确阈值；后者需随生长更新区域统计量。",en:"Choose representative seeds and define a similarity test based on intensity, color or texture, with clearly specified thresholds.",aliases:["阈值","种子","similarity","threshold","均值"]},
      {label:"邻接与生长规则",text:"指定4邻域或8邻域；用待检查队列记录边界邻点，将合格且未标记的像素加入区域。多种子竞争时规定归属和处理顺序，避免重复标记。",en:"Specify connectivity and update rules, inspect unassigned neighbors, and resolve competition between growing regions.",aliases:["连通","邻域","connectivity","队列","归属"]},
      {label:"停止与实用问题",text:"当没有邻点满足条件时停止；检查噪声、弱边界造成的泄漏、灰度渐变和阈值敏感性。需要时先去噪、结合边缘限制，并处理未分配像素与可合并区域。",en:"Stop when no eligible neighbor remains; handle noise, weak boundaries, leakage, unassigned pixels and possible region merging.",aliases:["停止","泄漏","noise","stop","leakage","边界"]}
    ],
    example:"<p><strong>新编例子：</strong>种子灰度100，规定与种子差不超过10，且采用4邻接。相邻像素106可加入，125不可加入；远处一个灰度103的孤立像素也不能直接加入，因为它尚未与该区域相邻。</p>",
    trap:"只看灰度相似而不检查相邻关系，就可能把远处无关像素合进来。还要说清与谁比较：种子、当前区域均值和上一像素不是同一个规则。",
    variants:["Describe seed-based region growing and discuss seed selection, similarity tests and stopping rules.","How are neighboring pixels merged into a region, and why can region growing leak across weak boundaries?"],
    quiz:{prompt:"采用4邻接区域生长时，远处一个与种子灰度相同的孤立像素，是否立刻加入区域？",options:["一定加入，因为灰度相同","不应直接加入，还须满足与区域相邻等条件","只有改成8位图像才加入","一定属于边缘"],answer:1,explain:"区域生长同时要求相似性与空间连通性，灰度相同不能代替相邻条件。"},
    cloze:{text:"Region growing begins with one or more ___ pixels.",answers:["seed","seeds","种子"],explain:"本题可用 seeds → similarity → neighbors → stopping 来回忆答案结构。"},
    sources:["https://www.cs.auckland.ac.nz/courses/compsci773s1c/lectures/ImageProcessing-html/topic3.htm"]
  },
  {
    id:31,title:"自动全局阈值的迭代步骤",topic:"分割与描述",
    en:"Provide implementation steps for automatic global threshold processing applicable to bimodal-histogram image segmentation.",
    zh:"给出适用于双峰直方图分割的自动全局阈值迭代步骤。",
    cues:[{en:"automatic global threshold",zh:"用一个自动估计的阈值分割整张图"},{en:"bimodal histogram",zh:"目标与背景形成两类灰度分布"},{en:"two class means",zh:"两类均值的中点更新阈值"}],
    intuition:"先猜一道分界线，把像素分成亮、暗两堆；看两堆各自的平均值，把分界线移到两个平均值中间；再分堆，直到分界线基本不动。",
    points:[
      {label:"初始化",text:"选初始阈值 T₀，例如全图平均灰度；给定终止容差 ε 和最大迭代次数。非常量图像要使初值位于最小、最大灰度之间。",en:"Choose an initial threshold, a convergence tolerance and a maximum number of iterations.",aliases:["初始","initial","容差","平均","阈值"]},
      {label:"分组",text:"按当前 T 分成 G₁={f>T} 和 G₂={f≤T}。相等情况归哪一组可以另作约定，但整个算法需保持一致。",en:"Partition the pixels into two groups using the current threshold.",aliases:["分组","两组","partition","groups","≤"]},
      {label:"求均值并更新",text:"计算两组像素的平均灰度 μ₁、μ₂，更新 Tnew=(μ₁+μ₂)/2。若由直方图计算，须按各灰度的像素数加权，不能对出现过的灰度简单平均。",en:"Compute each group mean and update the threshold to the midpoint, Tnew = (mu1 + mu2) / 2.",aliases:["均值","中点","mean","midpoint","更新"]},
      {label:"重复、停止与输出",text:"重复分组和更新，直到 |Tnew−T|<ε 或达到迭代上限，再用最终 T 二值化。常量图像或空组需单独处理。方法适合两类较可分的灰度，照明明显不均时单一全局阈值可能不够。",en:"Repeat until the threshold changes by less than the tolerance, then binarize the image using the final threshold.",aliases:["重复","停止","tolerance","repeat","二值化"]}
    ],
    example:"<p><strong>新编例题：</strong>灰度为10、12、14、100、104，取T₀=50。暗组均值12，亮组均值102，T₁=(12+102)/2=57。用57重分，分组不变，T₂=57，迭代停止。按f>T置1，结果为0、0、0、1、1。</p>",
    trap:"本题这里采用‘两类均值中点’的基本迭代法，不要把它的更新公式和 Otsu 最大类间方差混写。空组时不能除以0。",
    variants:["Describe iterative threshold selection using the means of two pixel groups.","How can a global threshold be estimated automatically for a two-mode intensity histogram?"],
    quiz:{prompt:"某次分组的均值为40和160，下一次阈值是多少？",options:["40","80","100","160"],answer:2,explain:"新阈值取两类均值中点：(40+160)/2=100。"},
    cloze:{text:"The iterative global threshold is updated to the ___ of the two group means.",answers:["midpoint","average","中点","平均值"],explain:"Tnew=(μ₁+μ₂)/2，然后重新分组、再求均值。"}
  },
  {
    id:32,title:"区域表示与区域描述",topic:"分割与描述",
    en:"Explain the connection and difference between region representation and description.",
    zh:"解释区域表示与区域描述的联系和区别。",
    cues:[{en:"representation",zh:"用什么结构保存区域或边界"},{en:"description / descriptors",zh:"从区域提取什么特征"},{en:"boundary / region",zh:"边界表示与完整区域表示"}],
    intuition:"轮廓点列表像把一个人的外形画下来；身高、周长等数值像给这个外形作特征摘要。前者是表示，后者是描述。",
    points:[
      {label:"区域表示",text:"区域表示决定以什么数据结构保存分割对象。可用边界表示，如有序边界点、链码；也可用区域表示，如区域内像素集合、二值掩膜或游程。",en:"Representation specifies how an object is stored, using its boundary or its complete region.",aliases:["边界","像素","存储","boundary","stored","mask"]},
      {label:"区域描述",text:"描述是根据表示提取可用于比较和识别的特征，例如面积、周长、质心、紧致度、矩、纹理。它通常形成比原始区域数据更简洁的特征向量。",en:"Description extracts features such as area, perimeter, centroid, moments and texture for comparison or recognition.",aliases:["特征","面积","features","area","识别"]},
      {label:"二者联系",text:"表示为描述提供数据，描述把区域的性质转成适合分析的量。选择边界表示还是完整区域表示，取决于任务主要关注形状轮廓还是内部灰度、纹理等信息。",en:"Representation supplies the data for description, and the task determines which representation and descriptors are appropriate.",aliases:["数据","提供","supplies","任务","描述"]},
      {label:"不变性需求",text:"识别任务常希望描述对平移、旋转或尺度变化不敏感，需要适当归一化；不是所有描述天然具备这些不变性。面积会随尺度改变，质心会随位置改变。",en:"Descriptors may require normalization for translation, rotation or scale invariance.",aliases:["不变","归一化","invariance","normalization","尺度"]}
    ],
    example:"<p><strong>新编例子：</strong>一块3×2像素的二值矩形，用6个前景像素或边界链码保存，是表示；由它计算面积A=6像素，是描述。周长取决于使用像素边缘还是像素中心轮廓，计算前须给出约定。</p>",
    trap:"链码是边界表示；从链码得到的形状特征可用于描述。不要把 representation 和 recognition（识别）当同一个概念。",
    variants:["Distinguish storing a region from extracting descriptors of that region.","How do boundary representations and region descriptors support object recognition?"],
    quiz:{prompt:"用边界点列表保存对象，再计算它的周长，前后分别是什么？",options:["描述、表示","表示、描述","恢复、增强","压缩、插值"],answer:1,explain:"边界点列表保存对象，是表示；计算周长得到特征，是描述。"},
    cloze:{text:"Area, perimeter and texture are examples of region ___.",answers:["descriptors","features","描述子","特征"],explain:"representation 提供对象数据，description 提取 descriptors。"}
  },
  {
    id:33,title:"四方向链码与形状数",topic:"分割与描述",
    en:"Calculate the 4-direction chain code representation of the following image. Provide the chain code, rotation-normalized chain code (cyclic differential chain code), and shape number.",
    zh:"求给定图形的四方向链码、循环差分链码和形状数。",
    note:"已从作业的原生矢量形状恢复第33题图形。原图未标起点及方向编码表，下方明确约定从左上角开始，右0、上1、左2、下3，沿原图箭头绕行；若课堂约定不同，绝对码串可能不同。",
    cues:[{en:"4-direction chain code",zh:"每一步只能沿上下左右"},{en:"cyclic differential chain code",zh:"相邻方向差取模4，包含末步到首步"},{en:"shape number",zh:"差分链码的最小循环移位"}],
    intuition:"链码记‘每一步往哪走’；差分链码记‘下一步相对上一步转多少’。把整体旋转去掉后，再统一从哪一步开始，就得到形状数。",
    points:[
      {label:"先写方向、起点和方向约定",text:"本例采用x向右、y向上，0=右、1=上、2=左、3=下。从指定边界起点按指定绕行方向走一圈，每步记录方向码cᵢ。若题图另有方向编号，须跟随题图。",en:"State the direction numbering, starting point and traversal direction, then record each boundary step.",aliases:["方向","起点","starting","direction","约定"]},
      {label:"循环差分",text:"定义 dᵢ=(cᵢ₊₁−cᵢ) mod 4，并令cₙ=c₀，不能漏掉最后一个方向到第一个方向的差。差分消去方向码中由90°整数倍旋转产生的共同偏移。",en:"Compute successive direction differences modulo four, including the last-to-first difference, to remove discrete rotation offsets.",aliases:["mod","4","差分","末","最后","difference"]},
      {label:"形状数",text:"将完整差分序列循环移位，选字典序最小的一个作为形状数，从而统一起点。固定长度时可理解为从最小数值串开始，前导0须保留。",en:"The shape number is the lexicographically smallest cyclic shift of the first-difference sequence.",aliases:["最小","循环","smallest","cyclic","前导"]},
      {label:"适用范围",text:"链码本身与位置平移无关，但依赖起点、绕行方向、网格和采样。差分与最小移位处理旋转和起点，不能自动消除尺度变化或反向绕行。",en:"Normalization handles the starting point and discrete rotation, but not arbitrary scale changes or reversal of traversal.",aliases:["尺度","反向","scale","reversal","旋转"]}
    ],
    example:"<p><strong>原题图形恢复与计算：</strong>原图由12条原生箭头线段构成，轮廓宽3步、高2步，底部中央有一格向上的凹口。下图按原始坐标与旋转重建；线段间的小偏差来自原图手工排布。</p><svg xmlns='http://www.w3.org/2000/svg' viewBox='-90 -90 1827 1314' role='img' aria-label='第33题原始箭头轮廓，底部中央有一格凹口' style='display:block;width:100%;max-width:420px;height:auto;background:white'><defs><marker id='q33arrow' viewBox='0 0 12 10' refX='10' refY='5' markerWidth='9' markerHeight='8' orient='auto'><path d='M0,0 L12,5 L0,10 L3,5 Z' fill='#111'/></marker></defs><g fill='none' stroke='#111' stroke-width='9' stroke-linecap='round' marker-end='url(#q33arrow)'><line x1='567' y1='0' x2='1107' y2='0'/><line x1='1107' y1='3' x2='1647' y2='3'/><line x1='1617' y1='27' x2='1617' y2='567'/><line x1='1617' y1='552' x2='1617' y2='1092'/><line x1='27' y1='3' x2='567' y2='3'/><line x1='27' y1='543' x2='27' y2='3'/><line x1='27' y1='1068' x2='27' y2='528'/><line x1='540' y1='1095' x2='0' y2='1095'/><line x1='549' y1='594' x2='549' y2='1134'/><line x1='1602' y1='1095' x2='1062' y2='1095'/><line x1='1092' y1='1092' x2='1092' y2='552'/><line x1='1092' y1='567' x2='552' y2='567'/></g></svg><p>从左上角开始，沿箭头依次为：右×3、下×2、左、上、左、下、左、上×2。约定右0、上1、左2、下3，链码 c=<strong>000332123211</strong>。</p><p>按 dᵢ=(cᵢ₊₁−cᵢ) mod4，循环差分为<strong>003033113303</strong>；其最小循环移位仍为<strong>003033113303</strong>，即该约定下的形状数。若换起点，差分串只循环移位，形状数保持不变。</p>",
    trap:"链码、差分链码、形状数是三步，不能只把原链码排序。循环移位只换起点，不改变元素先后连接关系；前导0不能删除。",
    variants:["Normalize a four-connected boundary code for rotation and starting point.","Given a 4-direction contour code, compute its cyclic first difference and shape number."],
    quiz:{prompt:"按dᵢ=(cᵢ₊₁−cᵢ)mod4，若最后一步为3、第一步为0，最后一个循环差分是多少？",options:["−3","0","1","3"],answer:2,explain:"(0−3) mod4=1。模运算结果取0、1、2、3之一。"},
    cloze:{text:"For a 4-direction chain code, successive direction differences are taken modulo ___.",answers:["4","four","四"],explain:"四方向用模4，八方向用模8；末项也必须计算。"},
    sources:["https://www.cs.ucf.edu/~dmarino/progcontests/mysols/collegeregional/rockymtn/RockyMountain-11/probset.pdf"]
  },
  {
    id:34,title:"八方向链码与形状数",topic:"分割与描述",
    en:"Calculate the 8-direction chain code representation of the following image. Provide the chain code, rotation-normalized chain code (cyclic differential chain code), and shape number.",
    zh:"求给定图形的八方向链码、循环差分链码和形状数。",
    missing:"作业中的唯一原生矢量图锚定在第33题后；第34题未发现单独的轮廓图，也未说明是否共用上图，因此不能确认第34题原题数值答案。下方自建轮廓仅用于练习方法。",
    cues:[{en:"8-direction",zh:"上下左右及四个斜向"},{en:"modulo eight",zh:"方向差取模8"},{en:"rotation / starting point",zh:"先差分消旋转，再最小循环移位定起点"}],
    intuition:"八方向链码允许斜着走，所以更贴近斜边；记绝对方向仍怕整体旋转，改记相邻两步的转角就稳定得多。",
    points:[
      {label:"八方向编号",text:"本例x向右、y向上，方向从右开始逆时针编号：0右、1右上、2上、3左上、4左、5左下、6下、7右下。沿指定起点和绕行方向记录链码。",en:"Use eight stated directions, including diagonals, and trace the boundary from a specified starting point.",aliases:["八","斜","eight","diagonal","方向"]},
      {label:"差分取模8",text:"dᵢ=(cᵢ₊₁−cᵢ) mod8，首尾也相接。整体旋转45°的整数倍使各方向码加同一常数，差分会消去这个常数。",en:"Take successive direction differences modulo eight, including the wraparound pair, to remove discrete rotation offsets.",aliases:["8","差分","modulo","difference","首尾"]},
      {label:"形状数",text:"枚举差分链码的全部循环移位，选字典序最小的序列。它在同一采样网格、方向与差分约定下统一起点；前导0与序列长度都保留。",en:"Choose the smallest cyclic shift of the difference code as the shape number, preserving leading zeros.",aliases:["最小","循环","smallest","cyclic","零"]},
      {label:"与四方向的区别",text:"四方向只允许正交步，八方向可含斜步。若由链码估算几何周长，正交步长度为1、斜步为√2，不能全部当1；数字化重采样后也不保证任意角度旋转完全不变。",en:"Eight-direction codes allow diagonal steps; a diagonal step has geometric length square root of two on a unit grid.",aliases:["斜","√2","diagonal","四","周长"]}
    ],
    example:"<p><strong>自建方法例题：</strong>轮廓为(0,0)→(1,1)→(0,2)→(−1,1)→(0,0)，使用本题给出的编号。</p><p>链码 c=<strong>1357</strong>；差分为(3−1,5−3,7−5,1−7) mod8，即<strong>2222</strong>；形状数也是<strong>2222</strong>。共有4个斜步，几何路径长度4√2；该数值对应这个自建轮廓。</p>",
    trap:"八方向的模数必须是8。绕行方向反转并非普通循环移位，一般会改变差分串，不能声称形状数自动消除镜像或反向。",
    variants:["Compute the rotation-normalized first difference of an eight-direction boundary code.","Find the chain code and the minimum cyclic difference code for an eight-connected contour."],
    quiz:{prompt:"按dᵢ=(cᵢ₊₁−cᵢ)mod8，从方向7变为方向1，差分是多少？",options:["−6","1","2","6"],answer:2,explain:"(1−7) mod8=2。即从7逆时针走两格到1。"},
    cloze:{text:"The shape number is the smallest cyclic shift of the ___ code.",answers:["difference","first difference","differential","差分","一阶差分"],explain:"先求差分，再对差分串做最小循环移位；不能直接对原码排序。"},
    sources:["https://www.cs.ucf.edu/~dmarino/progcontests/mysols/collegeregional/rockymtn/RockyMountain-11/probset.pdf"]
  }
];
