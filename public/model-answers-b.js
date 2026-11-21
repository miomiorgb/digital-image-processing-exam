/* 完整考试作答范本：按作业要求整理，非教师官方评分答案。 */
window.MODEL_ANSWERS_B = {
  18: {
    english: `<p>Both methods improve image quality or help a specific task.</p>
<p><strong>Enhancement</strong> makes useful details easier to see. It usually needs no degradation model. Examples are histogram equalization and sharpening. We judge it by how the image looks or how well it supports the task.</p>
<p><strong>Restoration</strong> estimates the original image from a degraded one. It uses a degradation model and prior knowledge:</p>
<p class="formula">g=h∗f+n,</p>
<p>where f is the original image, h is the blur function, and n is noise. Examples are inverse filtering and Wiener filtering. We judge it by reconstruction accuracy.</p>
<p>The two methods may overlap: a restored image may also look better.</p>`,
    chinese: `<p>两者都能改善图像质量，或让图像更适合某项任务。</p>
<p><strong>图像增强</strong>让有用的细节更容易看清，通常不需要退化模型。例如直方图均衡化、锐化。主要看处理后的视觉效果或任务效果。</p>
<p><strong>图像恢复</strong>根据退化模型和先验知识，从退化图像估计原图。常用模型为：</p>
<p class="formula">g=h∗f+n，</p>
<p>其中 f 是原图，h 是模糊函数，n 是噪声。例如逆滤波、维纳滤波。主要看重建结果与原图有多接近。</p>
<p>两者可以交叉：恢复后的图像也可能看起来更清楚。</p>`,
    scoring: ["先写共同目的，并说明二者可重叠","增强：任务或视觉驱动，通常不要求显式退化模型","恢复：退化模型 g=h∗f+n、先验与原图估计","各举至少一个方法，说明评价依据不同"]
  },
  20: {
    status: "方法范本与补充算例完整；课堂原题数据仍待补充。",
    english: `<p>First map the output pixel to its input coordinate (x,y). State the coordinate and boundary rules.</p>
<p><strong>Nearest neighbor:</strong> copy the closest pixel:</p>
<p class="formula">g(x,y)=f(round(x),round(y)).</p>
<p>State how ties are rounded. It is fast and keeps the original gray levels, but may give blocky or jagged edges.</p>
<p><strong>Bilinear:</strong> let x=x₀+α, y=y₀+β, with 0≤α,β≤1. Use the four surrounding pixels:</p>
<p class="formula">g=(1−α)(1−β)f₀₀+α(1−β)f₁₀+(1−α)βf₀₁+αβf₁₁.</p>
<p>The weights sum to 1. Interpolate along x, then y. The result is smoother but may blur edges.</p>
<p><strong>Supplementary example:</strong> for f₀₀=10, f₁₀=20, f₀₁=30, f₁₁=40 at (0.25,0.5):</p>
<pre>Top:    0.75×10+0.25×20=12.5
Bottom: 0.75×30+0.25×40=32.5
Bilinear: 0.5×12.5+0.5×32.5=22.5
Nearest neighbor: 30, if half-integer ties round upward.</pre>`,
    chinese: `<p>先把输出像素映射到原图坐标 (x,y)，说明坐标对齐和边界处理规则。</p>
<p><strong>最近邻：</strong>找到最近的原图像素，直接复制它的灰度：</p>
<p class="formula">g(x,y)=f(round(x),round(y))。</p>
<p>等距时需说明如何取整。该方法速度快，保留原有灰度级，但放大后容易出现块状或锯齿。</p>
<p><strong>双线性：</strong>令 x=x₀+α、y=y₀+β，0≤α,β≤1，用周围四点加权：</p>
<p class="formula">g=(1−α)(1−β)f₀₀+α(1−β)f₁₀+(1−α)βf₀₁+αβf₁₁。</p>
<p>四个权重之和为1。可以先沿 x 插值，再沿 y 插值。结果更平滑，但可能使边缘模糊。</p>
<p><strong>补充算例：</strong>四角 f₀₀、f₁₀、f₀₁、f₁₁ 依次为10、20、30、40，求 (0.25,0.5)：</p>
<pre>上边：0.75×10+0.25×20=12.5
下边：0.75×30+0.25×40=32.5
双线性：0.5×12.5+0.5×32.5=22.5
最近邻：半整数向大坐标取整时，结果为30。</pre>`,
    scoring: ["先交代连续坐标映射、边界和取整约定","最近邻：选最近采样点并复制值","双线性：完整四项权重公式、权重和为1","写出逐步代入结果并区分方法效果","明确补充算例不等于课堂原题"]
  },
  21: {
    english: `<p><strong>Light uses additive RGB:</strong> red, green and blue. Their complements are:</p>
<table><thead><tr><th>Primary</th><th>Complement</th></tr></thead><tbody><tr><td>Red</td><td>Cyan</td></tr><tr><td>Green</td><td>Magenta</td></tr><tr><td>Blue</td><td>Yellow</td></tr></tbody></table>
<p>A primary light plus its complement gives <strong>white</strong> at suitable intensities. Cyan=green+blue, magenta=red+blue, and yellow=red+green.</p>
<p><strong>Ideal pigments use subtractive CMY:</strong> cyan, magenta and yellow. They absorb red, green and blue light, respectively. Their complements are red, green and blue.</p>
<p>For pigments, magenta+yellow gives red, cyan+yellow gives green, and cyan+magenta gives blue. Each ideal primary pigment mixed with its complement gives <strong>black</strong>. Real inks are imperfect, so printing also uses black ink K.</p>`,
    chinese: `<p><strong>光采用加色模型 RGB：</strong>三原色为红、绿、蓝，互补色如下：</p>
<table><thead><tr><th>原色</th><th>互补色</th></tr></thead><tbody><tr><td>红</td><td>青</td></tr><tr><td>绿</td><td>品红</td></tr><tr><td>蓝</td><td>黄</td></tr></tbody></table>
<p>原色光与互补色光按适当强度相加，得到<strong>白光</strong>。其中青=绿+蓝，品红=红+蓝，黄=红+绿。</p>
<p><strong>理想颜料采用减色模型 CMY：</strong>三原色为青、品红、黄，分别吸收红、绿、蓝光；其互补色依次为红、绿、蓝。</p>
<p>颜料混合时，品红+黄得到红，青+黄得到绿，青+品红得到蓝。理想原色颜料与其互补色混合得到<strong>黑色</strong>。实际油墨并不理想，因此印刷还会使用黑色墨 K。</p>`,
    scoring: ["光：RGB、加色及两两混合关系","写全红青、绿品红、蓝黄三组互补关系","原色光加互补色光得到白光，注明适当强度","理想颜料：CMY、吸收关系与对应RGB互补色","理想互补颜料混合得到黑色，区别现实油墨"]
  },
  22: {
    english: `<p><strong>RGB</strong> describes a color by red, green and blue components. Each normalized value lies in [0,1]. The colors form a cube: (0,0,0) is black, (1,1,1) is white, and R=G=B gives gray. RGB is useful for cameras and displays.</p>
<p><strong>HSI</strong> means hue, saturation and intensity. H tells the color type; S tells how pure the color is; I tells how bright it is.</p>
<p class="formula">I=(R+G+B)/3,<br>S=1−3min(R,G,B)/(R+G+B), for R+G+B&gt;0.</p>
<p>For RGB=(0.3,0.6,0.9), I=0.6 and S=0.5. Gray has S=0 and no defined hue. Black needs a separate convention.</p>
<p>HSI lets us adjust intensity separately from color. It differs from HSV, whose V is the maximum RGB component.</p>`,
    chinese: `<p><strong>RGB</strong>用红、绿、蓝三个分量表示颜色。归一化后各分量在[0,1]内，构成一个立方体：(0,0,0)为黑，(1,1,1)为白，R=G=B 时为灰色。RGB 适合摄像和显示。</p>
<p><strong>HSI</strong>指色调、饱和度、强度。H 表示是什么颜色，S 表示颜色有多纯，I 表示有多亮。</p>
<p class="formula">I=(R+G+B)/3，<br>S=1−3min(R,G,B)/(R+G+B)，其中 R+G+B&gt;0。</p>
<p>例如 RGB=(0.3,0.6,0.9)，则 I=0.6，S=0.5。灰色的 S=0，色调无定义；黑色需单独约定。</p>
<p>HSI 便于将强度与颜色分开调整。它不等于 HSV，后者的 V 是 RGB 中的最大分量。</p>`,
    scoring: ["RGB三个分量、加色立方体、黑白及灰轴","HSI三个英文全称与各自物理含义","I与S公式及黑色/无彩色色调的特殊情况","RGB与HSI的主要应用及联系","不混淆HSI与HSV/HSL"]
  },
  23: {
    english: `<p>A <strong>pseudo-color image</strong> assigns artificial colors to gray levels. It helps us see value differences, but does not recover the object's true colors.</p>
<p><strong>Intensity slicing:</strong> divide the gray-level range into intervals and give each interval one color. For example, use blue for 0–84, green for 85–169, and red for 170–255. A pixel of intensity 120 appears green.</p>
<p><strong>Gray-level-to-color transformation:</strong> map each gray value r to three components:</p>
<p class="formula">R=T<sub>R</sub>(r), G=T<sub>G</sub>(r), B=T<sub>B</sub>(r).</p>
<p>The mapping can use functions or a lookup table (LUT). Smooth functions give a smooth color scale. Include a color legend to show the value of each color.</p>`,
    chinese: `<p><strong>伪彩色图像</strong>把灰度值按规定映射成人工颜色，帮助观察数值差异，但不恢复物体的真实颜色。</p>
<p><strong>灰度分层：</strong>将灰度范围分成若干区间，每段使用一种颜色。例如0–84用蓝色、85–169用绿色、170–255用红色，灰度120就显示为绿色。</p>
<p><strong>灰度到彩色变换：</strong>把每个灰度 r 映射为三个分量：</p>
<p class="formula">R=T<sub>R</sub>(r)，G=T<sub>G</sub>(r)，B=T<sub>B</sub>(r)。</p>
<p>可用函数或查找表 LUT 实现。平滑变化的函数能得到连续色阶，显示时应附上色标，说明各颜色代表的数值。</p>`,
    scoring: ["定义：人为灰度到颜色映射，说明可视化目的","方法一：灰度分层、区间和赋色步骤","方法二：三通道映射函数或LUT","举一个可操作例子并说明色标","区分伪彩色与恢复真实颜色"]
  },
  25: {
    english: `<p>Let f be the original image, g the reconstructed image, e=g−f, and K=MN the number of pixels.</p>
<p><strong>Objective criteria</strong> measure reconstruction error:</p>
<p class="formula">MSE=(1/K)Σe²,<br>RMSE=√MSE.</p>
<p>Smaller values mean less error. RMSE has the same unit as intensity.</p>
<p>Using original-image energy, define:</p>
<p class="formula">SNR<sub>ms</sub>=Σf²/Σe²,<br>SNR<sub>rms</sub>=√SNR<sub>ms</sub>,<br>SNR<sub>dB</sub>=10log₁₀SNR<sub>ms</sub>=20log₁₀SNR<sub>rms</sub>.</p>
<p>Some textbooks use Σg² in the numerator. State the convention.</p>
<p class="formula">PSNR=10log₁₀(MAX²/MSE) dB.</p>
<p>MAX=255 for 8-bit images. Larger SNR or PSNR usually means less distortion. When MSE=0, PSNR=+∞.</p>
<p><strong>Subjective criteria</strong> ask viewers to rate image quality under fixed conditions. They reflect visual effects that pixel errors may miss. Compression ratio and entropy measure coding, not fidelity.</p>`,
    chinese: `<p>设 f 为原图，g 为重建图，误差 e=g−f，像素总数 K=MN。</p>
<p><strong>客观准则</strong>用数值衡量重建误差：</p>
<p class="formula">MSE=(1/K)Σe²，<br>RMSE=√MSE。</p>
<p>二者越小，误差越小。RMSE 与灰度值的单位相同。</p>
<p>采用原图能量时，信噪比为：</p>
<p class="formula">SNR<sub>ms</sub>=Σf²/Σe²，<br>SNR<sub>rms</sub>=√SNR<sub>ms</sub>，<br>SNR<sub>dB</sub>=10log₁₀SNR<sub>ms</sub>=20log₁₀SNR<sub>rms</sub>。</p>
<p>有些教材用 Σg² 作分子，计算时需说明所用约定。</p>
<p class="formula">PSNR=10log₁₀(MAX²/MSE) dB。</p>
<p>8位图像取 MAX=255。SNR、PSNR 越大，通常失真越小。MSE=0 时，PSNR=+∞。</p>
<p><strong>主观准则</strong>让观察者在固定条件下给图像质量评分，反映数值误差未必能说明的视觉效果。压缩率和熵衡量编码，不是保真度指标。</p>`,
    scoring: ["定义原图、重建图及误差","MSE、RMSE完整公式及大小意义","区分SNR能量比、RMS比与dB表达，注明分子约定","PSNR公式、MAX与MSE=0特殊情况","主观评价方法与客观指标的局限"]
  },
  26: {
    english: `<p><strong>Huffman coding</strong> is lossless. It gives short codes to common symbols and long codes to rare symbols. No codeword is the prefix of another, so decoding is clear.</p>
<p><strong>Steps:</strong> repeatedly merge the two smallest probabilities and replace them by their sum, until one node remains. Give the two branches labels 0 and 1. Read each code from root to leaf. This gives an optimal binary prefix code.</p>
<p>For probabilities pᵢ and code lengths lᵢ:</p>
<p class="formula">Entropy: H=−Σpᵢlog₂pᵢ (average information),<br>Average length: L̄=Σpᵢlᵢ (actual bits/symbol),<br>Efficiency: η=H/L̄,<br>Relative redundancy: R=1−η.</p>
<p>The excess length L̄−H is measured in bits/symbol, not percent.</p>
<p><strong>Example:</strong> for A, B, C, D with probabilities 0.4, 0.3, 0.2, 0.1:</p>
<pre>Merge: 0.1+0.2=0.3; 0.3+0.3=0.6; 0.4+0.6=1.
Codes: A=0, B=10, C=110, D=111.
L̄=0.4×1+0.3×2+0.2×3+0.1×3=1.9
H≈1.84644 bits/symbol
η≈97.18%; R≈2.82%</pre>
<p>Swapping branch labels gives other valid codewords.</p>`,
    chinese: `<p><strong>Huffman 编码</strong>是一种无损编码：常见符号用短码，少见符号用长码。任何码字都不是另一个码字的前缀，因此可以明确解码。</p>
<p><strong>步骤：</strong>每次合并概率最小的两个节点，新节点概率为二者之和，直到只剩根节点；给每处分叉的两条边标0、1，从根到叶读取码字。由此得到最优二进制前缀码。</p>
<p>设符号概率为 pᵢ，码长为 lᵢ：</p>
<p class="formula">熵 H=−Σpᵢlog₂pᵢ：平均信息量，<br>平均码长 L̄=Σpᵢlᵢ：实际平均比特数，<br>效率 η=H/L̄，<br>相对冗余 R=1−η。</p>
<p>额外码长 L̄−H 的单位是 bit/符号，不是百分比。</p>
<p><strong>算例：</strong>概率为0.4、0.3、0.2、0.1：</p>
<pre>合并：0.1+0.2=0.3；0.3+0.3=0.6；0.4+0.6=1。
码字：A=0，B=10，C=110，D=111。
L̄=0.4×1+0.3×2+0.2×3+0.1×3=1.9
H≈1.84644 bit/符号
η≈97.18%；R≈2.82%</pre>
<p>交换分支上的0、1，可得到其他合法码字。</p>`,
    scoring: ["变长、无损、前缀无歧义三项核心性质","完整写出最小两概率合并与根到叶赋码算法","熵、平均码长、效率、冗余的定义公式及单位","概率例题的树构造、码字与指标一致","注明相对冗余与超额比特的区别、码字不唯一"]
  },
  27: {
    english: `<p><strong>Predictive coding</strong> uses the similarity of neighboring pixels. Predict the current pixel from earlier reconstructed pixels, then encode the prediction error:</p>
<p class="formula">e=f−f<sub>p</sub>,</p>
<p>where f is the actual value and f<sub>p</sub> is the prediction. The decoder uses the same predictor and adds the decoded error to recover the pixel. Both sides need the same scan order, starting values and boundary rules.</p>
<p>A good predictor makes errors cluster near zero. Their entropy is often lower, so entropy coding needs fewer bits. For example:</p>
<pre>Pixels: 100, 101, 100, 102
Store: first value 100; errors 1, −1, 2.</pre>
<p>Exact errors allow <strong>lossless</strong> coding. Quantized errors usually give <strong>lossy</strong> coding. Both encoder and decoder must predict from the same reconstructed samples.</p>`,
    chinese: `<p><strong>预测编码</strong>利用相邻像素的相似性。先用前面已重建的像素预测当前值，再编码预测误差：</p>
<p class="formula">e=f−f<sub>p</sub>，</p>
<p>其中 f 是真实值，f<sub>p</sub> 是预测值。解码端使用相同预测器，把解码误差加到预测值上，恢复像素。双方需采用相同的扫描顺序、初值和边界规则。</p>
<p>预测准确时，误差集中在0附近，熵通常更低，因此熵编码需要的比特更少。例如：</p>
<pre>原像素：100、101、100、102
记录：首值100；后续误差1、−1、2。</pre>
<p>精确编码误差可实现<strong>无损</strong>；量化误差通常产生<strong>有损</strong>编码。编码端与解码端都应使用相同的重建样本进行预测。</p>`,
    scoring: ["利用邻点相关性与预测器","残差公式及编码、解码相加重建流程","用近零集中和更低统计冗余解释压缩效率","量化可选，正确区分有损与无损","双方使用一致重建样本预测，交代边界和初值"]
  },
  28: {
    english: `<p>Let R be the whole image and P be the chosen homogeneity rule. The nonempty regions R₁,…,Rₙ should satisfy five conditions.</p>
<p><strong>1. Coverage:</strong> ⋃Rᵢ=R. Every pixel belongs to a region.</p>
<p><strong>2. Connectivity:</strong> each Rᵢ is connected under the chosen 4- or 8-adjacency rule.</p>
<p><strong>3. No overlap:</strong> Rᵢ∩Rⱼ=∅ for i≠j. A pixel belongs to only one region.</p>
<p><strong>4. Internal homogeneity:</strong> P(Rᵢ)=TRUE. Each region meets the gray-level, color or texture rule.</p>
<p><strong>5. Separate neighbors:</strong> P(Rᵢ∪Rⱼ)=FALSE for adjacent regions. They cannot be merged while keeping the same rule.</p>
<p>Connectivity concerns position; homogeneity concerns pixel features.</p>`,
    chinese: `<p>设 R 为整幅图像，P 为选定的同质性准则。非空区域 R₁、…、Rₙ 应满足五个条件。</p>
<p><strong>1. 完整覆盖：</strong>⋃Rᵢ=R。每个像素都属于某一区域。</p>
<p><strong>2. 区域连通：</strong>每个 Rᵢ 在规定的4邻接或8邻接下连通。</p>
<p><strong>3. 互不重叠：</strong>i≠j 时，Rᵢ∩Rⱼ=∅。一个像素只能属于一个区域。</p>
<p><strong>4. 内部同质：</strong>P(Rᵢ)=TRUE。区域内部满足规定的灰度、颜色或纹理准则。</p>
<p><strong>5. 相邻区域不能再合并：</strong>相邻的 Rᵢ、Rⱼ 满足 P(Rᵢ∪Rⱼ)=FALSE，合并后不再同质。</p>
<p>连通约束空间位置，同质约束像素特征。</p>`,
    scoring: ["覆盖：并集等于完整图像","每个区域在指定邻接下连通","互斥：不同区域交集为空","区域自身满足同质性谓词P","相邻区域的并集不满足P，区别连通与同质"]
  },
  29: {
    english: `<p>Edges are places where intensity changes quickly. Derivatives give strong responses there and near-zero responses in flat areas.</p>
<p><strong>First order:</strong> use the gradient ∇f=(Gₓ,Gᵧ). Its magnitude gives edge strength; its direction is normal to the edge:</p>
<p class="formula">|∇f|=√(Gₓ²+Gᵧ²)≈|Gₓ|+|Gᵧ|.</p>
<p>A pair of Sobel masks is:</p>
<pre>Gx = −1  0  1       Gy = −1 −2 −1
     −2  0  2             0  0  0
     −1  0  1             1  2  1</pre>
<p>Combine both responses and threshold the magnitude.</p>
<p><strong>Second order:</strong> use the Laplacian:</p>
<p class="formula">∇²f=∂²f/∂x²+∂²f/∂y².</p>
<pre> 0  1  0
 1 −4  1
 0  1  0</pre>
<p>For a smoothed step edge, look for a strong sign change across zero. Smooth first because derivatives amplify noise. A zero alone is not an edge: flat areas can also be zero. Reversing a mask's sign keeps magnitudes and zero-crossing locations unchanged.</p>`,
    chinese: `<p>边缘处灰度变化快，微分响应强；平坦区域灰度变化小，微分响应接近0。</p>
<p><strong>一阶微分：</strong>用梯度 ∇f=(Gₓ,Gᵧ)。幅值表示边缘强度，方向与边缘大致垂直：</p>
<p class="formula">|∇f|=√(Gₓ²+Gᵧ²)≈|Gₓ|+|Gᵧ|。</p>
<p>可用一对 Sobel 模板：</p>
<pre>Gx = −1  0  1       Gy = −1 −2 −1
     −2  0  2             0  0  0
     −1  0  1             1  2  1</pre>
<p>合成两个响应，再按梯度幅值设阈值检测边缘。</p>
<p><strong>二阶微分：</strong>用拉普拉斯算子：</p>
<p class="formula">∇²f=∂²f/∂x²+∂²f/∂y²。</p>
<pre> 0  1  0
 1 −4  1
 0  1  0</pre>
<p>对于平滑阶跃边缘，寻找响应明显变号的过零点。微分会放大噪声，因此通常先平滑。不能只凭响应为0就判为边缘，因为平坦区也可能为0。模板整体变号不改变幅值和过零位置。</p>`,
    scoring: ["从边缘灰度快速变化解释微分依据","一阶梯度分量、幅值和方向含义","给出一对完整Sobel模板及合成方法","二阶拉普拉斯公式、完整模板和过零依据","噪声敏感、先平滑及过零幅度条件"]
  },
  30: {
    english: `<p><strong>Region growing</strong> starts from seed pixels and adds similar neighbors until no more pixels can be added.</p>
<p><strong>Steps:</strong> choose seeds and a 4- or 8-neighbor rule. Set a similarity test, such as |f(p)−μ<sub>R</sub>|≤T. Check unassigned neighbors, add those that pass, update the region mean μ<sub>R</sub>, and check the new neighbors. Stop when no neighbor passes.</p>
<p><strong>Practical issues:</strong> choose suitable seeds, features and thresholds. State whether similarity is measured against the seed or the current region. Resolve conflicts between growing regions. Noise and weak boundaries can cause gaps or leakage; smoothing or edge limits may help. Also handle unassigned pixels and small regions.</p>
<p>Both similarity and connectivity are required.</p>`,
    chinese: `<p><strong>区域生长</strong>从种子像素出发，逐步加入相似邻点，直到区域不能继续扩大。</p>
<p><strong>步骤：</strong>选择种子，规定4邻域或8邻域，设置相似性判据，例如 |f(p)−μ<sub>R</sub>|≤T。检查未分配邻点，将合格者加入区域，更新区域均值 μ<sub>R</sub>，再检查新邻点；没有合格邻点时停止。</p>
<p><strong>实际问题：</strong>需要选好种子、特征和阈值，并说明像素是与种子还是当前区域比较。多个区域竞争时要规定归属。噪声和弱边界可能造成区域破碎或泄漏，可通过平滑或边缘约束改善；还要处理未分配像素和小区域。</p>
<p>加入像素必须同时满足相似性与空间连通性。</p>`,
    scoring: ["从种子逐步合并相似邻点的基本思想","完整算法：种子、邻接、判据、候选检查、更新、停止","实际问题：种子选择与特征/阈值选择","明确比较对象与多区域竞争规则","噪声、弱边界泄漏、剩余区域等处理"]
  },
  31: {
    english: `<p>For a bimodal histogram, use the <strong>iterative two-class-mean method</strong>.</p>
<p><strong>1.</strong> Choose T₀, for example the image mean. Set a tolerance ε and an iteration limit.</p>
<p><strong>2.</strong> Split the pixels into G₁={f&gt;T} and G₂={f≤T}.</p>
<p><strong>3.</strong> Find their means μ₁ and μ₂. With a histogram, weight gray levels by pixel counts.</p>
<p><strong>4.</strong> Update T<sub>new</sub>=(μ₁+μ₂)/2.</p>
<p><strong>5.</strong> Repeat until |T<sub>new</sub>−T|&lt;ε or the limit is reached. Use the final T to set f&gt;T to 1 and the rest to 0.</p>
<p><strong>Example:</strong> for 10,12,14,100,104 with T₀=50:</p>
<pre>μ₁=102, μ₂=12; T₁=(102+12)/2=57.
The groups stay unchanged; T₂=57.
Binary result: 0,0,0,1,1.</pre>
<p>Handle empty groups and constant images separately. This method works best with two clear groups and fairly uniform illumination.</p>`,
    chinese: `<p>对于双峰直方图，可用<strong>两类均值中点迭代法</strong>确定全局阈值。</p>
<p><strong>1.</strong>选初始阈值 T₀，例如全图均值；设定容差 ε 和迭代上限。</p>
<p><strong>2.</strong>按当前 T 分组：G₁={f&gt;T}，G₂={f≤T}。</p>
<p><strong>3.</strong>求两组均值 μ₁、μ₂。若使用直方图，按各灰度的像素数加权。</p>
<p><strong>4.</strong>更新 T<sub>new</sub>=(μ₁+μ₂)/2。</p>
<p><strong>5.</strong>重复上述步骤，直到 |T<sub>new</sub>−T|&lt;ε 或达到上限；最后将 f&gt;T 置1，其余置0。</p>
<p><strong>例：</strong>灰度为10、12、14、100、104，取 T₀=50：</p>
<pre>μ₁=102，μ₂=12；T₁=(102+12)/2=57。
再次分组不变，T₂=57。
二值结果：0、0、0、1、1。</pre>
<p>空组和常量图像需单独处理。本方法适合两类灰度较清楚、照明较均匀的情况。</p>`,
    scoring: ["初始化阈值、容差与迭代上限","明确两组定义及相等灰度归属","按像素数量加权求两组均值","中点更新公式与收敛条件","最终二值化、空组/常量图像和适用条件"]
  },
  32: {
    english: `<p><strong>Representation</strong> tells how a region is stored. We can store its boundary as contour points, a polygon or a chain code. We can also store the whole region as a pixel set, binary mask or run lengths.</p>
<p><strong>Description</strong> extracts useful features from that representation, such as area, perimeter, centroid, compactness, moments and texture. These features help compare or recognize objects.</p>
<p>For example, storing a 3×2 rectangle's six pixels is representation; calculating its area A=6 is description.</p>
<p>Representation supplies the data for description. Choose both to suit the task. Translation, rotation or scale invariance may need normalization. Area changes with scale; the centroid changes with position.</p>`,
    chinese: `<p><strong>表示</strong>说明怎样存储区域。可以用轮廓点、多边形或链码保存边界，也可以用像素集合、二值掩膜或游程保存整个区域。</p>
<p><strong>描述</strong>从表示中提取特征，例如面积、周长、质心、紧致度、矩和纹理，用于比较或识别对象。</p>
<p>例如，保存3×2矩形的6个像素属于表示；计算它的面积 A=6 属于描述。</p>
<p>表示为描述提供数据，两者都应按任务选择。若要求对平移、旋转或尺度变化不敏感，需要适当归一化。面积随尺度改变，质心随位置改变。</p>`,
    scoring: ["清楚区分存储结构与特征提取","边界表示和完整区域表示及例子","列举多个描述子及其用途","用同一个对象说明表示到描述的关系","说明任务选择与不变性需要"]
  },
  33: {
    english: `<p>Use the recovered original contour. Start at the upper-left corner, follow the arrows, and use <strong>0=right, 1=up, 2=left, 3=down</strong>.</p>
<p><strong>Chain code:</strong> right×3, down×2, left, up, left, down, left, up×2 gives:</p>
<pre>c=0 0 0 3 3 2 1 2 3 2 1 1
 =000332123211.</pre>
<p><strong>Cyclic difference:</strong> use dᵢ=(cᵢ₊₁−cᵢ) mod4, including the last-to-first pair:</p>
<pre>d=0 0 3 0 3 3 1 1 3 3 0 3
 =003033113303.</pre>
<p>A 90°-multiple rotation adds the same offset to each direction. Subtraction removes it.</p>
<p><strong>Shape number:</strong> take the smallest cyclic shift of d. It is <strong>003033113303</strong>. This removes the starting-point dependence. Keep leading zeros. Scale changes, reverse traversal and arbitrary-angle resampling are not removed by these steps.</p>`,
    chinese: `<p>采用恢复的原题轮廓，从左上角开始沿箭头行走，规定<strong>0右、1上、2左、3下</strong>。</p>
<p><strong>链码：</strong>行走顺序为右3、下2、左、上、左、下、左、上2，得到：</p>
<pre>c=0 0 0 3 3 2 1 2 3 2 1 1
 =000332123211。</pre>
<p><strong>循环差分：</strong>按 dᵢ=(cᵢ₊₁−cᵢ) mod4 计算，包括最后一步到第一步：</p>
<pre>d=0 0 3 0 3 3 1 1 3 3 0 3
 =003033113303。</pre>
<p>旋转90°的整数倍，会使各方向码增加同一偏移量，作差便将它消去。</p>
<p><strong>形状数：</strong>取 d 的最小循环移位，得到<strong>003033113303</strong>，从而统一起点。前导0要保留。这些步骤不能自动消除尺度变化、反向绕行或任意角度重采样的影响。</p>`,
    scoring: ["先声明方向编号、左上角起点与沿箭头绕行","原图12步对应链码000332123211","首尾相连取模4，差分003033113303","求差分最小循环移位得到形状数","说明旋转和起点归一化的作用及限制"]
  },
  34: {
    status: "方法范本完整；缺少可确认的第34题独立原图，原题数值答案待补。",
    english: `<p><strong>Direction table:</strong> with x rightward and y upward, number directions counterclockwise: 0 right, 1 upper-right, 2 up, 3 upper-left, 4 left, 5 lower-left, 6 down, 7 lower-right. State the start and traversal direction.</p>
<p><strong>Chain code:</strong> trace the boundary and record each step cᵢ.</p>
<p><strong>Cyclic difference:</strong> dᵢ=(cᵢ₊₁−cᵢ) mod8, including last-to-first. This removes 45°-multiple rotation offsets.</p>
<p><strong>Shape number:</strong> take the smallest cyclic shift of d and keep leading zeros. Reverse traversal is not automatically removed.</p>
<p><strong>Example only:</strong></p>
<pre>(0,0)→(1,1)→(0,2)→(−1,1)→(0,0)
c=1357
d=(3−1,5−3,7−5,1−7) mod8=2222
Shape number=2222; path length=4√2.</pre>`,
    chinese: `<p><strong>方向表：</strong>规定 x 向右、y 向上，从右起逆时针编号：0右、1右上、2上、3左上、4左、5左下、6下、7右下。说明起点和绕行方向。</p>
<p><strong>链码：</strong>沿轮廓行走，记录每步方向 cᵢ。</p>
<p><strong>循环差分：</strong>dᵢ=(cᵢ₊₁−cᵢ) mod8，包括最后一步到第一步。它消去45°整数倍旋转造成的方向偏移。</p>
<p><strong>形状数：</strong>取 d 的最小循环移位，保留前导0。反向绕行不会自动被消除。</p>
<p><strong>仅作方法示例：</strong></p>
<pre>(0,0)→(1,1)→(0,2)→(−1,1)→(0,0)
c=1357
d=(3−1,5−3,7−5,1−7) mod8=2222
形状数=2222；路径长度=4√2。</pre>`,
    scoring: ["写全八方向编号与绕行约定","逐步记录原始方向码","首尾相接、差分取模8","从完整差分串求最小循环移位","明确示例与原题缺图状态，不编造原题数值"]
  }
};
