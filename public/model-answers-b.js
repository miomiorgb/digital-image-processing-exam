/* 完整考试作答范本：按作业要求整理，非教师官方评分答案。 */
window.MODEL_ANSWERS_B = {
  18: {
    english: `<p><strong>Common purpose.</strong> Image enhancement and image restoration both improve image quality or make an image more useful for a task. Some of their methods and results can overlap.</p>
<p><strong>Image enhancement.</strong> Enhancement makes useful information easier to see. It follows visual needs or the needs of a task. It usually does not need an explicit model of how the image was degraded. Examples include contrast stretching, histogram equalization and sharpening. We judge the result by visual quality or task performance. A better-looking image is not always a more accurate copy of the original scene.</p>
<p><strong>Image restoration.</strong> Restoration estimates the original image from a degraded image. It uses a degradation model and prior knowledge. A common model is:</p>
<p class="formula">g(x,y)=h(x,y)∗f(x,y)+n(x,y),</p>
<p>where f is the original image, h is the degradation function, and n is noise. Inverse filtering and Wiener filtering are examples. The main aim is to reduce reconstruction error under the chosen model.</p>
<p><strong>Relationship and difference.</strong> Enhancement aims to improve viewing or task results; restoration aims to reconstruct the original image using a model. A restored image may also look better, and enhancement may help later restoration or analysis. The two are not simply “subjective” and “objective”: both can be checked against the needs of the task. Neither is guaranteed to improve every image or task.</p>`,
    chinese: `<p><strong>共同目的：</strong>图像增强和图像恢复都能改善图像质量，或让图像更适合某项任务。两者的方法和效果可能交叉。</p>
<p><strong>图像增强：</strong>按视觉需要或任务需要，让有用的信息更容易看清，通常不必建立明确的退化模型。例如对比度拉伸、直方图均衡化和锐化。主要根据视觉效果或任务效果评价。图像看起来更清楚，不一定说明它更准确地接近原始场景。</p>
<p><strong>图像恢复：</strong>根据退化模型和先验知识，从退化图像估计原图。常用模型为：</p>
<p class="formula">g(x,y)=h(x,y)∗f(x,y)+n(x,y)，</p>
<p>其中 f 是原图，h 是退化函数，n 是噪声。逆滤波、维纳滤波是典型方法，主要目标是在所选模型下减小重建误差。</p>
<p><strong>联系与区别：</strong>增强侧重改善观看或任务效果，恢复侧重依据模型重建原图。恢复后的图像也可能更好看，增强也可能帮助后续恢复或分析。不能简单地说增强完全主观、恢复完全客观，两者都可以按任务需要评价，也都不能保证适合所有图像和任务。</p>`,
    scoring: ["先写共同目的，并说明二者可重叠","增强：任务或视觉驱动，通常不要求显式退化模型","恢复：退化模型 g=h∗f+n、先验与原图估计","各举至少一个方法，说明评价依据不同"]
  },
  20: {
    status: "方法范本与补充算例完整；课堂原题数据仍待补充。",
    english: `<p><strong>1. Find the input coordinate.</strong> Map the output pixel back to a continuous position (x,y) in the input image. State the pixel-center or endpoint alignment rule and the boundary rule. These choices can change the numerical answer.</p>
<p><strong>2. Nearest-neighbor interpolation.</strong> Find the closest input pixel and copy its value:</p>
<p class="formula">g(x,y)=f(round(x),round(y)).</p>
<p>State the rounding rule when two pixels are equally close. This method is fast and keeps the original gray levels. Enlarged images may have blocky regions and jagged edges.</p>
<p><strong>3. Bilinear interpolation.</strong> Let x=x₀+α and y=y₀+β, where 0≤α,β≤1. Use the four surrounding values f₀₀, f₁₀, f₀₁ and f₁₁:</p>
<p class="formula">g=(1−α)(1−β)f₀₀+α(1−β)f₁₀+(1−α)βf₀₁+αβf₁₁.</p>
<p>All four weights are nonnegative and add up to 1. We can first interpolate twice along x, then once along y. The result is usually smoother than nearest neighbor, but edges may become softer.</p>
<p><strong>Supplementary example.</strong> Let f₀₀=10, f₁₀=20, f₀₁=30, f₁₁=40, and find the value at (0.25,0.5).</p>
<pre>Upper edge: 0.75×10+0.25×20=12.5
Lower edge: 0.75×30+0.25×40=32.5
Bilinear: 0.5×12.5+0.5×32.5=22.5
Nearest neighbor: choose (0,1), giving 30,
if a half-integer tie rounds to the larger coordinate.</pre>
<p>This is a method example. The classroom exercise needs its original data and coordinate rules.</p>`,
    chinese: `<p><strong>1. 找到原图坐标。</strong>把输出像素映射回原图中的连续位置 (x,y)，说明采用像素中心对齐还是端点对齐，以及边界怎样处理。这些选择可能改变计算结果。</p>
<p><strong>2. 最近邻插值。</strong>找到距离最近的原图像素，直接复制它的灰度：</p>
<p class="formula">g(x,y)=f(round(x),round(y))。</p>
<p>如果距离相同，要说明取整规则。该方法速度快，保留原有灰度级，但放大后容易出现块状和锯齿边缘。</p>
<p><strong>3. 双线性插值。</strong>令 x=x₀+α、y=y₀+β，0≤α,β≤1，用四个邻点 f₀₀、f₁₀、f₀₁、f₁₁ 加权：</p>
<p class="formula">g=(1−α)(1−β)f₀₀+α(1−β)f₁₀+(1−α)βf₀₁+αβf₁₁。</p>
<p>四个权重均非负，和为1。可以先沿 x 做两次线性插值，再沿 y 做一次。结果通常比最近邻平滑，但边缘可能变软。</p>
<p><strong>补充算例。</strong>设 f₀₀=10、f₁₀=20、f₀₁=30、f₁₁=40，求 (0.25,0.5) 的灰度。</p>
<pre>上边：0.75×10+0.25×20=12.5
下边：0.75×30+0.25×40=32.5
双线性：0.5×12.5+0.5×32.5=22.5
最近邻：若半整数取较大坐标，则取(0,1)，结果为30。</pre>
<p>这是方法示例。课堂原题的数值解仍需要原始数据与坐标约定。</p>`,
    scoring: ["先交代连续坐标映射、边界和取整约定","最近邻：选最近采样点并复制值","双线性：完整四项权重公式、权重和为1","写出逐步代入结果并区分方法效果","明确补充算例不等于课堂原题"]
  },
  21: {
    english: `<p><strong>1. Light: additive mixing.</strong> The three primaries are red, green and blue (RGB). Adding two gives a secondary color:</p>
<pre>Red + green = yellow
Green + blue = cyan
Blue + red = magenta</pre>
<p>The primary–complement pairs are:</p>
<table><thead><tr><th>Primary light</th><th>Complement</th></tr></thead><tbody><tr><td>Red</td><td>Cyan</td></tr><tr><td>Green</td><td>Magenta</td></tr><tr><td>Blue</td><td>Yellow</td></tr></tbody></table>
<p>At suitable intensities, a primary light plus its complement gives <strong>white</strong>. The pair supplies all three RGB components. For example, cyan contains green and blue, so red+cyan gives white.</p>
<p><strong>2. Pigments: subtractive mixing.</strong> The ideal primaries are cyan, magenta and yellow (CMY). Cyan absorbs red light, magenta absorbs green, and yellow absorbs blue. Mixing two ideal pigments gives:</p>
<pre>Magenta + yellow = red
Cyan + yellow = green
Cyan + magenta = blue</pre>
<p>The complementary pairs are cyan–red, magenta–green and yellow–blue. Each ideal primary pigment plus its complement absorbs all three primary light components and gives <strong>black</strong>. Real pigments are imperfect, so the mixture may be dark and muddy rather than fully black. Printing therefore often adds black ink K.</p>`,
    chinese: `<p><strong>1. 光：加色混合。</strong>三原色是红、绿、蓝，即 RGB。两种原色光相加得到：</p>
<pre>红+绿=黄
绿+蓝=青
蓝+红=品红</pre>
<p>原色光与互补色光的对应关系为：</p>
<table><thead><tr><th>原色光</th><th>互补色</th></tr></thead><tbody><tr><td>红</td><td>青</td></tr><tr><td>绿</td><td>品红</td></tr><tr><td>蓝</td><td>黄</td></tr></tbody></table>
<p>按适当强度混合时，原色光与互补色光补齐 RGB 三个分量，得到<strong>白光</strong>。例如青光包含绿、蓝，因此红光加青光得到白光。</p>
<p><strong>2. 颜料：减色混合。</strong>理想三原色是青、品红、黄，即 CMY。青吸收红光，品红吸收绿光，黄吸收蓝光。两种理想颜料混合得到：</p>
<pre>品红+黄=红
青+黄=绿
青+品红=蓝</pre>
<p>互补配对为青—红、品红—绿、黄—蓝。理想原色颜料与其互补色混合后，三种原色光都被吸收，得到<strong>黑色</strong>。实际颜料并不理想，混合后可能只是暗浊色，因此印刷通常另加黑色墨 K。</p>`,
    scoring: ["光：RGB、加色及两两混合关系","写全红青、绿品红、蓝黄三组互补关系","原色光加互补色光得到白光，注明适当强度","理想颜料：CMY、吸收关系与对应RGB互补色","理想互补颜料混合得到黑色，区别现实油墨"]
  },
  22: {
    english: `<p><strong>1. RGB model.</strong> RGB uses red, green and blue light components to describe a color. With normalized values R,G,B∈[0,1], the colors form a unit cube. Black is (0,0,0), white is (1,1,1), and R=G=B forms the gray axis. In an 8-bit-per-channel image, each component is an integer from 0 to 255.</p>
<p>RGB is convenient for cameras, displays and storage. However, each channel contains both color and intensity information, so these are not separated.</p>
<p><strong>2. HSI model.</strong> HSI means hue, saturation and intensity. Hue H gives the color type and is expressed as an angle. Saturation S tells how far a color is from gray: a smaller S means less pure color. Intensity I gives the average light level. A common definition is:</p>
<p class="formula">I=(R+G+B)/3,<br>S=1−3min(R,G,B)/(R+G+B), when R+G+B&gt;0.</p>
<p>For RGB=(0.3,0.6,0.9), I=0.6 and S=0.5. For gray with R=G=B&gt;0, S=0 and hue is undefined. At black, the formula for S also needs a separate rule; software may set H=S=0.</p>
<p><strong>3. Use and difference.</strong> HSI lets us enhance I while keeping H and S. The converted RGB values must still stay in the valid color range. HSI differs from HSV and HSL: its I is the RGB average, not the largest component used for HSV's V.</p>`,
    chinese: `<p><strong>1. RGB 模型。</strong>用红、绿、蓝三个光分量表示颜色。归一化后 R、G、B∈[0,1]，颜色构成单位立方体。黑色是(0,0,0)，白色是(1,1,1)，R=G=B 的直线是灰度轴。每通道8位时，各分量是0至255的整数。</p>
<p>RGB 适合摄像、显示和存储，但三个通道都同时包含颜色与强度信息，两者没有分开。</p>
<p><strong>2. HSI 模型。</strong>HSI 指色调、饱和度、强度。色调 H 用角度表示是什么颜色；饱和度 S 表示偏离灰色的程度，越小越不鲜艳；强度 I 表示平均明暗。常用定义为：</p>
<p class="formula">I=(R+G+B)/3，<br>S=1−3min(R,G,B)/(R+G+B)，其中 R+G+B&gt;0。</p>
<p>例如 RGB=(0.3,0.6,0.9)，则 I=0.6，S=0.5。对于 R=G=B&gt;0 的灰色，S=0，色调没有唯一意义。黑色还需单独规定 S，软件可为方便设 H=S=0。</p>
<p><strong>3. 用途与区别。</strong>HSI 便于只增强 I，尽量保留 H、S；但转回 RGB 时，数值仍要落在可表示的颜色范围内。HSI 与 HSV、HSL 不同：I 是 RGB 平均值，而 HSV 的 V 是最大分量。</p>`,
    scoring: ["RGB三个分量、加色立方体、黑白及灰轴","HSI三个英文全称与各自物理含义","I与S公式及黑色/无彩色色调的特殊情况","RGB与HSI的主要应用及联系","不混淆HSI与HSV/HSL"]
  },
  23: {
    english: `<p><strong>Definition and purpose.</strong> A pseudo-color image maps gray levels, or other single-channel values, to artificial colors. Color helps us distinguish small differences and highlight important value ranges. These colors do not have to match the object's true colors.</p>
<p><strong>Method 1: intensity slicing (density slicing).</strong> Divide the gray-level range into intervals and give each interval one color. Each pixel takes the color of its interval. For an 8-bit image, we can use blue for 0–84, green for 85–169, and red for 170–255. A pixel with intensity 120 is green. This method highlights selected value bands.</p>
<p><strong>Method 2: gray-level-to-color transformation.</strong> Map each input value r to three output components:</p>
<p class="formula">R=T<sub>R</sub>(r), G=T<sub>G</sub>(r), B=T<sub>B</sub>(r).</p>
<p>Use three functions or a lookup table (LUT). Smoothly changing functions give a smooth color scale, rather than sharp jumps between bands.</p>
<p><strong>Interpretation.</strong> Include a legend to show which values the colors mean. Pseudo-color changes how existing measurements are displayed. It does not recover true scene colors or add new measured information.</p>`,
    chinese: `<p><strong>定义与目的。</strong>伪彩色图像把灰度值或其他单通道数值映射成人工颜色。颜色能帮助分辨小差异、突出重要数值范围，但不一定是物体的真实颜色。</p>
<p><strong>方法一：灰度分层，也称密度分层。</strong>把灰度范围划成若干区间，每段指定一种颜色，像素按所在区间着色。对8位图像，可将0–84设为蓝色、85–169设为绿色、170–255设为红色，则灰度120显示为绿色。该方法适合突出指定数值区间。</p>
<p><strong>方法二：灰度到彩色变换。</strong>把每个输入值 r 映射为三个分量：</p>
<p class="formula">R=T<sub>R</sub>(r)，G=T<sub>G</sub>(r)，B=T<sub>B</sub>(r)。</p>
<p>可用三个函数或查找表 LUT 实现。函数平滑变化时，可以得到连续色阶，减少分层处的颜色突变。</p>
<p><strong>解释结果。</strong>应附上色标，说明颜色对应的数值。伪彩色只是换一种方式显示已有测量，既不恢复真实场景颜色，也不增加新的测量信息。</p>`,
    scoring: ["定义：人为灰度到颜色映射，说明可视化目的","方法一：灰度分层、区间和赋色步骤","方法二：三通道映射函数或LUT","举一个可操作例子并说明色标","区分伪彩色与恢复真实颜色"]
  },
  25: {
    english: `<p><strong>Meaning.</strong> Compression fidelity tells how closely the reconstructed image g matches the original image f. Let e(x,y)=g(x,y)−f(x,y), and let K=MN be the number of pixels. We use both objective measures and subjective ratings.</p>
<p><strong>1. MSE and RMSE.</strong> These measure pixel-by-pixel reconstruction error:</p>
<p class="formula">MSE=(1/K)Σ<sub>x,y</sub>e(x,y)²,<br>RMSE=√MSE.</p>
<p>Smaller values mean less error. MSE has squared intensity units; RMSE has the same unit as image intensity.</p>
<p><strong>2. Signal-to-noise ratio.</strong> Treat the reconstruction error as noise. Using original-image energy as signal energy:</p>
<p class="formula">SNR<sub>ms</sub>=Σf²/Σe²,<br>SNR<sub>rms</sub>=√(Σf²/Σe²),<br>SNR<sub>dB</sub>=10log₁₀(SNR<sub>ms</sub>)=20log₁₀(SNR<sub>rms</sub>).</p>
<p>A larger ratio means less error relative to the signal. The energy ratio and its square root have no unit; the logarithmic form uses dB. Some textbooks use reconstructed-image energy Σg² in the numerator. State and follow the course's convention.</p>
<p><strong>3. Peak signal-to-noise ratio.</strong></p>
<p class="formula">PSNR=10log₁₀(MAX²/MSE) dB.</p>
<p>MAX is the largest representable intensity: 255 for unsigned 8-bit images. At the same intensity range, larger PSNR means lower MSE. If MSE=0, RMSE=0 and PSNR=+∞.</p>
<p><strong>4. Subjective criteria.</strong> Viewers rate overall quality or visible distortion under fixed viewing conditions. The location and structure of errors affect what people see, so equal MSE does not always mean equal visual quality. Objective and subjective checks complement each other. Compression ratio and entropy measure data size or coding, not reconstruction fidelity.</p>`,
    chinese: `<p><strong>含义。</strong>压缩保真度表示重建图像 g 与原图 f 有多接近。令误差 e(x,y)=g(x,y)−f(x,y)，像素总数 K=MN。评价包括客观数值指标和主观视觉评分。</p>
<p><strong>1. MSE 与 RMSE。</strong>它们衡量逐像素重建误差：</p>
<p class="formula">MSE=(1/K)Σ<sub>x,y</sub>e(x,y)²，<br>RMSE=√MSE。</p>
<p>数值越小，误差越小。MSE 的单位是强度单位的平方，RMSE 与图像强度的单位相同。</p>
<p><strong>2. 信噪比 SNR。</strong>把重建误差看作噪声，采用原图能量作为信号能量时：</p>
<p class="formula">SNR<sub>ms</sub>=Σf²/Σe²，<br>SNR<sub>rms</sub>=√(Σf²/Σe²)，<br>SNR<sub>dB</sub>=10log₁₀(SNR<sub>ms</sub>)=20log₁₀(SNR<sub>rms</sub>)。</p>
<p>比值越大，相对于信号的误差越小。能量比及其平方根均无单位，对数形式的单位为 dB。有些教材使用重建图能量 Σg² 作分子，计算时应说明并遵循课程约定。</p>
<p><strong>3. 峰值信噪比 PSNR。</strong></p>
<p class="formula">PSNR=10log₁₀(MAX²/MSE) dB。</p>
<p>MAX 是最大可表示强度，8位无符号图像取255。在相同动态范围下，PSNR 越大，MSE 越小。MSE=0 时，RMSE=0，PSNR=+∞。</p>
<p><strong>4. 主观准则。</strong>让观察者在固定观看条件下，对总体质量或可见失真评分。误差的位置和结构也影响观感，因此 MSE 相同不代表看起来一样。主观与客观评价应结合使用。压缩率和熵衡量数据量或编码，不是重建保真度。</p>`,
    scoring: ["定义原图、重建图及误差","MSE、RMSE完整公式及大小意义","区分SNR能量比、RMS比与dB表达，注明分子约定","PSNR公式、MAX与MSE=0特殊情况","主观评价方法与客观指标的局限"]
  },
  26: {
    english: `<p><strong>Basic idea.</strong> Huffman coding is a lossless, variable-length prefix code. Common symbols get short codewords; rare symbols get long ones. No codeword is the prefix of another, so the bitstream can be decoded without ambiguity.</p>
<p><strong>Construction.</strong> List the symbols and their probabilities. Merge the two least probable nodes. Give the new node the sum of their probabilities. Repeat until only one root remains. Label the two branches of each split 0 and 1. The path from the root to a symbol gives its codeword. For the given probabilities, this gives the smallest average length among binary symbol-by-symbol prefix codes.</p>
<p><strong>Four measures.</strong> Let pᵢ be symbol probabilities, with Σpᵢ=1, and lᵢ be codeword lengths:</p>
<p class="formula">Entropy H=−Σpᵢlog₂pᵢ,<br>Average code length L̄=Σpᵢlᵢ,<br>Coding efficiency η=H/L̄,<br>Relative coding redundancy R=1−H/L̄.</p>
<p>H is the average information per symbol. It is a lower bound on the average length of a binary symbol-by-symbol lossless code. L̄ is the actual average bits per symbol. Both H and L̄ use bits per symbol; η and R are ratios, often written as percentages. Efficiency tells how closely the code approaches this bound. Relative redundancy is the fraction above the entropy requirement. The excess length L̄−H is another measure, in bits per symbol rather than a percentage. For two or more positive-probability symbols, binary Huffman coding gives H≤L̄&lt;H+1.</p>
<p><strong>Example.</strong> For A,B,C,D with probabilities 0.4,0.3,0.2,0.1:</p>
<pre>Merge: 0.1+0.2=0.3; 0.3+0.3=0.6; 0.4+0.6=1.
One valid code: A=0, B=10, C=110, D=111.
L̄=0.4×1+0.3×2+0.2×3+0.1×3=1.9 bits/symbol
H=−(0.4log₂0.4+0.3log₂0.3+0.2log₂0.2+0.1log₂0.1)
 ≈1.84644 bits/symbol
η≈97.18%; R≈2.82%.</pre>
<p>Swapping branch labels or choosing differently between equal probabilities may give other valid codewords.</p>`,
    chinese: `<p><strong>基本思想。</strong>Huffman 编码是无损的变长前缀编码：常见符号用短码，少见符号用长码。任何码字都不是另一码字的前缀，因此能明确解码。</p>
<p><strong>构造步骤。</strong>列出符号与概率，每次合并概率最小的两个节点，新节点概率等于二者之和。重复到只剩一个根节点。给每处分叉的两条边标0、1，从根到某个符号的路径就是它的码字。对于给定概率，这种方法在二进制逐符号前缀码中使平均码长最小。</p>
<p><strong>四个指标。</strong>设符号概率为 pᵢ，Σpᵢ=1，码长为 lᵢ：</p>
<p class="formula">熵 H=−Σpᵢlog₂pᵢ，<br>平均码长 L̄=Σpᵢlᵢ，<br>编码效率 η=H/L̄，<br>相对编码冗余 R=1−H/L̄。</p>
<p>H 是每符号的平均信息量，也是二进制逐符号无损编码平均码长的下界。L̄ 是每符号实际平均比特数。H、L̄ 的单位是 bit/符号，η、R 是比值，常写成百分比。效率表示编码有多接近熵下界；相对冗余表示超出熵需求的比例。L̄−H 也可衡量多用的比特，但单位是 bit/符号，不是百分比。对至少两个正概率符号，二进制 Huffman 码满足 H≤L̄&lt;H+1。</p>
<p><strong>算例。</strong>A、B、C、D 的概率为0.4、0.3、0.2、0.1：</p>
<pre>合并：0.1+0.2=0.3；0.3+0.3=0.6；0.4+0.6=1。
一组合法码字：A=0，B=10，C=110，D=111。
L̄=0.4×1+0.3×2+0.2×3+0.1×3=1.9 bit/符号
H=−(0.4log₂0.4+0.3log₂0.3+0.2log₂0.2+0.1log₂0.1)
 ≈1.84644 bit/符号
η≈97.18%；R≈2.82%。</pre>
<p>交换分支0、1，或在等概率节点间采用不同选择，可能得到其他合法码字。</p>`,
    scoring: ["变长、无损、前缀无歧义三项核心性质","完整写出最小两概率合并与根到叶赋码算法","熵、平均码长、效率、冗余的定义公式及单位","概率例题的树构造、码字与指标一致","注明相对冗余与超额比特的区别、码字不唯一"]
  },
  27: {
    english: `<p><strong>Basic idea.</strong> Neighboring image pixels are often similar. Predictive coding uses earlier encoded or reconstructed neighbors to predict the current pixel. It codes the prediction error instead of coding the raw value independently.</p>
<p><strong>Encoder and decoder.</strong> Let f be the actual pixel and f<sub>p</sub> its prediction:</p>
<p class="formula">e=f−f<sub>p</sub>.</p>
<p>The encoder may quantize e, then entropy-code it. The decoder forms the same prediction and adds the decoded error:</p>
<p class="formula">g=f<sub>p</sub>+decoded error.</p>
<p>Both sides must know the scan order, predictor, initial values and boundary rules. With quantized errors, the encoder must also predict from reconstructed samples. Otherwise, its future predictions may differ from the decoder's.</p>
<p><strong>Why errors are easier to code.</strong> With a good predictor, errors cluster near zero. Compared with the raw intensities, their variance is usually smaller and their single-symbol distribution often has lower entropy. An entropy coder can therefore use fewer bits on average. A more concentrated error distribution can also make quantization more efficient: most likely errors need fewer quantizer indices, or a fixed number of bits can allow finer steps. This depends on the image and predictor.</p>
<p><strong>Example.</strong> Use the previous pixel as the predictor:</p>
<pre>Pixels: 100,101,100,102
Store the first value 100, then errors 1,−1,2.
Decode by adding each error to the previous value.</pre>
<p><strong>Lossless or lossy.</strong> Exact error coding without quantization can recover every pixel, so it is lossless. Quantizing errors usually introduces loss. Prediction reduces interpixel redundancy in the coded form; a reversible prediction does not delete image information. Errors may be negative and their possible range may be wider than the raw range. Small numbers alone do not guarantee fewer bits.</p>`,
    chinese: `<p><strong>基本思想。</strong>相邻图像像素通常相似。预测编码用前面已编码或已重建的邻点预测当前像素，再编码预测误差，而不是独立编码原始灰度。</p>
<p><strong>编码与解码。</strong>设 f 为真实像素，f<sub>p</sub> 为预测值：</p>
<p class="formula">e=f−f<sub>p</sub>。</p>
<p>编码端可先量化 e，再进行熵编码。解码端形成相同预测值，加上解码误差：</p>
<p class="formula">g=f<sub>p</sub>+解码误差。</p>
<p>双方必须知道相同的扫描顺序、预测器、初值和边界规则。误差经过量化时，编码端也要用重建样本预测，否则双方后续的预测值可能不一致。</p>
<p><strong>为什么误差更容易编码。</strong>预测准确时，误差集中在0附近。与原始灰度相比，其方差通常较小，逐符号分布的熵也常更低，因此熵编码平均需要的比特更少。误差分布集中也有利于量化：常见误差需要的量化索引更少，或在固定位数下可使用更细的量化步长。但效果仍取决于图像与预测器。</p>
<p><strong>算例。</strong>以前一个像素预测：</p>
<pre>原像素：100、101、100、102
记录首值100，再记录误差1、−1、2。
解码时，将每个误差加到前一个像素上。</pre>
<p><strong>无损与有损。</strong>不量化且精确编码误差，可以恢复每个像素，属于无损编码；量化误差通常产生损失。预测使编码形式中的像素间冗余减小，但可逆预测没有删除原图信息。误差可以为负，其可能取值范围甚至比原灰度范围更宽，不能只凭数值小就断言一定省比特。</p>`,
    scoring: ["利用邻点相关性与预测器","残差公式及编码、解码相加重建流程","用近零集中和更低统计冗余解释压缩效率","量化可选，正确区分有损与无损","双方使用一致重建样本预测，交代边界和初值"]
  },
  28: {
    english: `<p>Let R be the whole image region. A complete segmentation divides R into nonempty regions R₁,…,Rₙ. Choose a connectivity rule and a homogeneity rule P. The regions should meet five conditions.</p>
<p><strong>1. Complete coverage:</strong> ⋃<sub>i=1</sub><sup>n</sup>Rᵢ=R. Every pixel belongs to a region; none is left out.</p>
<p><strong>2. Connectivity:</strong> each Rᵢ is connected. Any two pixels in it can be joined by a path lying entirely inside it, under the chosen 4-, 8-, or other adjacency rule.</p>
<p><strong>3. No overlap:</strong> Rᵢ∩Rⱼ=∅ for i≠j. A pixel cannot belong to two different regions.</p>
<p><strong>4. Internal homogeneity:</strong> P(Rᵢ)=TRUE for each i. Every region meets the chosen gray-level, color or texture rule. The pixel values need not be exactly equal.</p>
<p><strong>5. Adjacent regions are different:</strong> for distinct adjacent regions, P(Rᵢ∪Rⱼ)=FALSE. They cannot be merged while still meeting the same homogeneity rule.</p>
<p>Coverage and no overlap make a complete partition. Connectivity is a spatial condition; homogeneity is a feature condition. The last rule prevents a region from being split into neighboring parts that should be joined.</p>`,
    chinese: `<p>设 R 为整幅图像区域，完整分割把 R 划成非空区域 R₁、…、Rₙ。先规定邻接方式和同质性准则 P，各区域应满足五个条件。</p>
<p><strong>1. 完整覆盖：</strong>⋃<sub>i=1</sub><sup>n</sup>Rᵢ=R。每个像素都属于某一区域，不能遗漏。</p>
<p><strong>2. 区域连通：</strong>每个 Rᵢ 都连通。区域内任意两像素之间，都有完全位于该区域内部的路径。路径应遵循事先规定的4邻接、8邻接等规则。</p>
<p><strong>3. 互不重叠：</strong>i≠j 时，Rᵢ∩Rⱼ=∅。一个像素不能同时属于两个不同区域。</p>
<p><strong>4. 内部同质：</strong>各区域满足 P(Rᵢ)=TRUE，即符合规定的灰度、颜色或纹理准则，不要求每个像素值完全相等。</p>
<p><strong>5. 相邻区域有差别：</strong>对于不同且相邻的区域，P(Rᵢ∪Rⱼ)=FALSE。合并后不再满足同一同质性准则。</p>
<p>覆盖和互斥保证划分完整；连通是空间条件，同质是特征条件；最后一个条件防止把本可合并的区域过度细分。</p>`,
    scoring: ["覆盖：并集等于完整图像","每个区域在指定邻接下连通","互斥：不同区域交集为空","区域自身满足同质性谓词P","相邻区域的并集不满足P，区别连通与同质"]
  },
  29: {
    english: `<p><strong>Basis.</strong> An edge is a rapid change in intensity. Derivatives give weak or zero responses in constant areas and strong responses near changes.</p>
<p><strong>1. First-order detection.</strong> Use the gradient ∇f=(Gₓ,Gᵧ), where Gₓ≈∂f/∂x and Gᵧ≈∂f/∂y. Its magnitude measures edge strength:</p>
<p class="formula">|∇f|=√(Gₓ²+Gᵧ²)≈|Gₓ|+|Gᵧ|.</p>
<p>The gradient points toward the fastest intensity increase and is normal to the local edge. A pair of Sobel masks is:</p>
<pre>Gx = −1  0  1       Gy = −1 −2 −1
     −2  0  2             0  0  0
     −1  0  1             1  2  1</pre>
<p>Apply both masks, combine their responses, and threshold the magnitude. Thinning can help locate a narrow edge.</p>
<p><strong>2. Second-order detection.</strong> Use the Laplacian:</p>
<p class="formula">∇²f=∂²f/∂x²+∂²f/∂y².</p>
<p>One four-neighbor mask is:</p>
<pre> 0  1  0
 1 −4  1
 0  1  0</pre>
<p>Across a smoothed step edge, the second derivative changes sign. A strong zero crossing can therefore locate the edge. The Laplacian does not directly give edge direction.</p>
<p><strong>Noise and detection.</strong> Derivatives amplify noise, especially second derivatives, so usually smooth first. Require a large enough response change across a zero crossing. A zero value alone is not enough: a flat area may have zero Laplacian everywhere. If a mask is multiplied by −1, gradient magnitude and zero-crossing positions stay unchanged; keep the chosen convention consistent.</p>`,
    chinese: `<p><strong>理论依据。</strong>边缘处的灰度变化快。微分在恒定区域的响应很弱或为0，在灰度变化处产生强响应。</p>
<p><strong>1. 一阶检测。</strong>使用梯度 ∇f=(Gₓ,Gᵧ)，其中 Gₓ≈∂f/∂x、Gᵧ≈∂f/∂y。梯度幅值表示边缘强度：</p>
<p class="formula">|∇f|=√(Gₓ²+Gᵧ²)≈|Gₓ|+|Gᵧ|。</p>
<p>梯度指向灰度增长最快的方向，与局部边缘大致垂直。可用一对 Sobel 模板：</p>
<pre>Gx = −1  0  1       Gy = −1 −2 −1
     −2  0  2             0  0  0
     −1  0  1             1  2  1</pre>
<p>分别计算两个模板响应，合成幅值，再设阈值检测。必要时细化，使边缘定位更窄。</p>
<p><strong>2. 二阶检测。</strong>使用拉普拉斯算子：</p>
<p class="formula">∇²f=∂²f/∂x²+∂²f/∂y²。</p>
<p>可用四邻域模板：</p>
<pre> 0  1  0
 1 −4  1
 0  1  0</pre>
<p>经过平滑的阶跃边缘附近，二阶导数会变号，因此可用明显的过零点定位边缘。拉普拉斯本身不直接给出边缘方向。</p>
<p><strong>噪声与判定。</strong>微分会放大噪声，二阶微分尤其敏感，因此通常先平滑。过零点两侧还需有足够大的响应变化，不能只凭响应为0就判为边缘，因为平坦区也可处处为0。模板整体乘−1，不改变梯度幅值或过零位置，但计算约定需保持一致。</p>`,
    scoring: ["从边缘灰度快速变化解释微分依据","一阶梯度分量、幅值和方向含义","给出一对完整Sobel模板及合成方法","二阶拉普拉斯公式、完整模板和过零依据","噪声敏感、先平滑及过零幅度条件"]
  },
  30: {
    english: `<p><strong>Basic idea.</strong> Region growing is a similarity-based segmentation method. Start with one or more seed pixels, then add neighboring pixels that meet a chosen similarity rule.</p>
<p><strong>Steps.</strong> Choose representative seeds inside the objects. Give each seed a region label, and choose 4- or 8-connectivity. Define a similarity test, for example:</p>
<p class="formula">|f(p)−μ<sub>R</sub>|≤T,</p>
<p>where μ<sub>R</sub> is the current region mean and T is a tolerance. Keep boundary candidates in a queue. Check unassigned candidates, add those that pass the test, update the region statistics, and check their neighbors. Continue until no further neighbor can be added. A pixel must be both similar and connected to the region.</p>
<p><strong>Practical issues.</strong> The number, positions and values of the seeds affect the result. Choose suitable intensity, color or texture features and a tolerance. State whether each pixel is compared with the seed, a fixed reference, or the changing region mean. With several growing regions, define ownership and conflict rules.</p>
<p>Noise, gradual intensity changes and weak boundaries can split an object or let a region leak into another object. Smoothing, edge limits and suitable stopping or merging rules may help. Also deal with unassigned pixels and small leftover regions. A distant pixel cannot join just because its gray value matches; it must be reached through the chosen neighborhood.</p>`,
    chinese: `<p><strong>基本思想。</strong>区域生长是一种基于相似性的分割方法。从一个或多个种子像素出发，逐步加入满足相似条件的邻接像素。</p>
<p><strong>步骤。</strong>在目标内部选择有代表性的种子，给它们区域标签，规定4连通或8连通。设置相似性判据，例如：</p>
<p class="formula">|f(p)−μ<sub>R</sub>|≤T，</p>
<p>其中 μ<sub>R</sub> 是当前区域均值，T 是容差。用队列保存边界候选点，检查未分配候选点，将合格者加入区域，更新区域统计量，再检查它们的邻点。直到没有新邻点可加入时停止。像素必须同时满足相似性和连通性。</p>
<p><strong>实际问题。</strong>种子的数量、位置和数值会影响结果。需要选择合适的灰度、颜色或纹理特征，以及相似阈值。还要说明是与种子、固定参考值，还是变化中的区域均值比较。多个区域生长时，应规定竞争像素的归属规则。</p>
<p>噪声、灰度渐变和弱边界可能使目标破碎，或让区域泄漏到别的目标，可结合平滑、边缘约束、停止和合并规则处理。同时处理未分配像素和细小残余区域。远处像素即使灰度相同，也不能跳过邻接条件直接加入。</p>`,
    scoring: ["从种子逐步合并相似邻点的基本思想","完整算法：种子、邻接、判据、候选检查、更新、停止","实际问题：种子选择与特征/阈值选择","明确比较对象与多区域竞争规则","噪声、弱边界泄漏、剩余区域等处理"]
  },
  31: {
    english: `<p><strong>Method.</strong> In a bimodal histogram, foreground and background often form two gray-level groups. Use the iterative two-class-mean method to find one global threshold.</p>
<p><strong>1. Initialize.</strong> Choose T₀, for example the image mean. Set a small tolerance ε and an iteration limit. For a nonconstant image, put the threshold between the minimum and maximum intensities so that both groups contain pixels.</p>
<p><strong>2. Split.</strong> With the current T, form G₁={p:f(p)&gt;T} and G₂={p:f(p)≤T}. Keep this rule for values equal to T throughout the algorithm.</p>
<p><strong>3. Find means.</strong> Compute the two group means μ₁ and μ₂. When using a histogram, weight each gray level by its pixel count; do not simply average the gray levels that appear.</p>
<p><strong>4. Update.</strong> Set T<sub>new</sub>=(μ₁+μ₂)/2.</p>
<p><strong>5. Repeat and output.</strong> Repeat until |T<sub>new</sub>−T|&lt;ε or the iteration limit is reached. Use the final T to set g(p)=1 for f(p)&gt;T, and g(p)=0 otherwise.</p>
<p><strong>Example.</strong> For intensities 10,12,14,100,104, choose T₀=50:</p>
<pre>G₁: 100,104 → μ₁=102
G₂: 10,12,14 → μ₂=12
T₁=(102+12)/2=57
The groups do not change, so T₂=57.
Binary labels: 0,0,0,1,1.</pre>
<p>Handle constant images and empty groups separately to avoid division by zero. A single global threshold works best with two well-separated groups and fairly uniform illumination. This is the iterative mean method; Otsu's method instead uses between-class variance.</p>`,
    chinese: `<p><strong>方法。</strong>双峰直方图中，目标与背景通常形成两组灰度。可用两类均值中点迭代法，自动确定一个全局阈值。</p>
<p><strong>1. 初始化。</strong>选 T₀，例如全图均值；设定较小容差 ε 和迭代上限。对于非常量图像，初值应在最小、最大灰度之间，使两组都有像素。</p>
<p><strong>2. 分组。</strong>按当前 T 分成 G₁={p:f(p)&gt;T}、G₂={p:f(p)≤T}，等于阈值的像素始终按同一规则归组。</p>
<p><strong>3. 求均值。</strong>计算两组均值 μ₁、μ₂。使用直方图时，应按各灰度的像素数加权，不能只平均出现过的灰度级。</p>
<p><strong>4. 更新。</strong>令 T<sub>new</sub>=(μ₁+μ₂)/2。</p>
<p><strong>5. 迭代并输出。</strong>重复到 |T<sub>new</sub>−T|&lt;ε，或达到迭代上限。用最终 T 二值化：f(p)&gt;T 时置1，其余置0。</p>
<p><strong>算例。</strong>灰度为10、12、14、100、104，取 T₀=50：</p>
<pre>G₁：100、104 → μ₁=102
G₂：10、12、14 → μ₂=12
T₁=(102+12)/2=57
再次分组不变，因此 T₂=57。
二值结果：0、0、0、1、1。</pre>
<p>常量图像与空组要单独处理，避免除以0。全局阈值适合两类灰度分离较清楚、照明较均匀的图像。本题是均值迭代法，Otsu 法采用的则是类间方差准则。</p>`,
    scoring: ["初始化阈值、容差与迭代上限","明确两组定义及相等灰度归属","按像素数量加权求两组均值","中点更新公式与收敛条件","最终二值化、空组/常量图像和适用条件"]
  },
  32: {
    english: `<p><strong>Representation: how to store the object.</strong> We can store only its boundary, using ordered contour points, a polygon or a chain code. We can also store the whole region, using a pixel set, a binary mask or run-length records.</p>
<p>A boundary representation is useful when the task mainly concerns outline shape. A whole-region representation also keeps interior pixels, which are needed for area, intensity and texture analysis.</p>
<p><strong>Description: what features to extract.</strong> From the chosen representation, calculate descriptors such as area, perimeter, centroid, compactness, moments and texture statistics. These usually form a feature vector for comparing or recognizing objects.</p>
<p><strong>Example.</strong> Saving the six foreground pixels of a 3×2 rectangle is a representation. Calculating its area A=6 pixels is a description.</p>
<p><strong>Connection and difference.</strong> Representation provides the data; description summarizes selected properties of those data. Choose both according to the task. If objects must be recognized after translation, rotation or scaling, use suitable normalization or invariant features. This is not automatic: the centroid changes with translation, and area changes with scale.</p>`,
    chinese: `<p><strong>表示：怎样保存对象。</strong>可以只保存边界，例如有序轮廓点、多边形或链码；也可以保存完整区域，例如像素集合、二值掩膜或游程记录。</p>
<p>任务主要关心外形时，边界表示较方便；完整区域表示还能保留内部像素，用于面积、灰度和纹理分析。</p>
<p><strong>描述：提取什么特征。</strong>根据选定的表示，计算面积、周长、质心、紧致度、矩、纹理统计量等描述子，通常组成特征向量，用来比较或识别对象。</p>
<p><strong>算例。</strong>保存3×2矩形的6个前景像素，属于表示；由这些像素计算面积 A=6 像素，属于描述。</p>
<p><strong>联系与区别。</strong>表示提供数据，描述提炼其中选定的性质。两者都要按任务选择。若要求平移、旋转或缩放后仍能识别，应适当归一化或使用不变特征。不变性并非自动具备，例如质心随平移改变，面积随尺度改变。</p>`,
    scoring: ["清楚区分存储结构与特征提取","边界表示和完整区域表示及例子","列举多个描述子及其用途","用同一个对象说明表示到描述的关系","说明任务选择与不变性需要"]
  },
  33: {
    english: `<p><strong>1. State the convention.</strong> Use the arrowed contour recovered from the Word document. The original figure has no labeled starting point or direction table. Here, start at the upper-left corner, follow the arrows, and use <strong>0=right, 1=up, 2=left, 3=down</strong>.</p>
<p><strong>2. Chain code.</strong> The moves are right×3, down×2, left, up, left, down, left, up×2. Recording each step gives:</p>
<pre>c=0 0 0 3 3 2 1 2 3 2 1 1
 =000332123211.</pre>
<p><strong>3. Cyclic difference.</strong> Use dᵢ=(cᵢ₊₁−cᵢ) mod4 and c₁₂=c₀. Include the last-to-first pair; its value is (0−1) mod4=3. The full difference code is:</p>
<pre>d=0 0 3 0 3 3 1 1 3 3 0 3
 =003033113303.</pre>
<p>This is the rotation-normalized cyclic differential code. A rotation by a multiple of 90° adds the same offset to every direction. Taking differences removes that offset modulo four.</p>
<p><strong>4. Shape number.</strong> Compare all cyclic shifts of d and choose the smallest one in dictionary order. The result is <strong>003033113303</strong>. Keep leading zeros and the order of the steps.</p>
<p>Changing the start may change c, but only cyclically shifts d. Taking its smallest shift removes that starting-point difference. These steps do not remove changes of scale, reverse traversal or arbitrary-angle resampling. If a different direction convention is used, state it before calculating.</p>`,
    chinese: `<p><strong>1. 说明约定。</strong>采用从 Word 恢复的箭头轮廓。原图未标明起点和方向编号，本解从左上角开始沿箭头绕行，规定<strong>0右、1上、2左、3下</strong>。</p>
<p><strong>2. 链码。</strong>顺序为右3步、下2步、左、上、左、下、左、上2步。逐步记录得到：</p>
<pre>c=0 0 0 3 3 2 1 2 3 2 1 1
 =000332123211。</pre>
<p><strong>3. 循环差分。</strong>令 dᵢ=(cᵢ₊₁−cᵢ) mod4，c₁₂=c₀。必须包括最后一步到第一步，其差为 (0−1) mod4=3。完整差分为：</p>
<pre>d=0 0 3 0 3 3 1 1 3 3 0 3
 =003033113303。</pre>
<p>这就是旋转归一化的循环差分链码。旋转90°的整数倍，会使各方向码增加同一偏移量；作差并取模4即可消去这个量。</p>
<p><strong>4. 形状数。</strong>比较 d 的全部循环移位，按字典序取最小串，得到<strong>003033113303</strong>。前导0和各步次序都要保留。</p>
<p>更换起点可能改变 c，但只使 d 循环移位；取最小循环移位即可统一起点。这些步骤不会自动消除尺度变化、反向绕行或任意角度重采样的影响。若采用其他方向约定，需先说明再计算。</p>`,
    scoring: ["先声明方向编号、左上角起点与沿箭头绕行","原图12步对应链码000332123211","首尾相连取模4，差分003033113303","求差分最小循环移位得到形状数","说明旋转和起点归一化的作用及限制"]
  },
  34: {
    status: "方法范本完整；缺少可确认的第34题独立原图，原题数值答案待补。",
    english: `<p><strong>1. State the directions.</strong> Let x increase to the right and y increase upward. Number the eight directions counterclockwise:</p>
<pre>0 right       1 upper-right
2 up          3 upper-left
4 left        5 lower-left
6 down        7 lower-right.</pre>
<p>Choose a starting point and traversal direction. Follow the boundary once and record the direction cᵢ of every step.</p>
<p><strong>2. Normalize rotation.</strong> Calculate the cyclic difference dᵢ=(cᵢ₊₁−cᵢ) mod8, including the last-to-first pair. A rotation by a multiple of 45° adds a common direction offset; subtraction removes it modulo eight.</p>
<p><strong>3. Normalize the start.</strong> Take the smallest cyclic shift of d as the shape number. Keep leading zeros and the full sequence length. Reversing the traversal is not the same as changing the start, so reversal is not automatically removed.</p>
<p><strong>Illustrative example.</strong> Use the contour:</p>
<pre>(0,0)→(1,1)→(0,2)→(−1,1)→(0,0)
c=1357
d=(3−1,5−3,7−5,1−7) mod8=2222
Shape number=2222.</pre>
<p>All cyclic shifts are the same here. Each diagonal step has length √2 on a unit grid, so this four-step path has length 4√2.</p>
<p><strong>Original-figure limit.</strong> The supplied document's identified contour is attached to Question 33. No separate figure for Question 34 is confirmed. Thus 1357 and 2222 solve this illustrative example, not the unconfirmed original figure.</p>`,
    chinese: `<p><strong>1. 规定方向。</strong>令 x 向右、y 向上，八个方向按逆时针编号：</p>
<pre>0右    1右上
2上    3左上
4左    5左下
6下    7右下。</pre>
<p>选定起点和绕行方向，沿边界走一周，记录每步方向 cᵢ。</p>
<p><strong>2. 消除旋转偏移。</strong>计算 dᵢ=(cᵢ₊₁−cᵢ) mod8，包括最后一步到第一步。旋转45°的整数倍，会给各方向码加上同一偏移量，作差取模8后将其消去。</p>
<p><strong>3. 统一起点。</strong>取 d 的最小循环移位作为形状数，保留前导0和完整长度。反向绕行不等于更换起点，不会自动被这个步骤消除。</p>
<p><strong>方法示例。</strong>轮廓为：</p>
<pre>(0,0)→(1,1)→(0,2)→(−1,1)→(0,0)
c=1357
d=(3−1,5−3,7−5,1−7) mod8=2222
形状数=2222。</pre>
<p>本例各循环移位相同。单位网格中每个斜步长 √2，因此4步路径的长度为4√2。</p>
<p><strong>原图限制。</strong>目前文档中能确认的轮廓图附在第33题后，第34题没有单独确认的图形。因此1357和2222是上述示例的答案，不是尚未确认的原题数值解。</p>`,
    scoring: ["写全八方向编号与绕行约定","逐步记录原始方向码","首尾相接、差分取模8","从完整差分串求最小循环移位","明确示例与原题缺图状态，不编造原题数值"]
  }
};
