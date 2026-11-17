/* 完整考试作答范本：按作业要求整理，非教师官方评分答案。 */
window.MODEL_ANSWERS_B = {
  18: {
    english: `<p><strong>Image enhancement</strong> and <strong>image restoration</strong> both process an image to improve its quality or usefulness, but their main objectives and assumptions differ.</p>
<p>Image enhancement modifies an image so that important information is easier to see or more suitable for a particular task. It usually does not require an explicit model of how the image was degraded. Examples include contrast stretching, histogram equalization and sharpening. Its success is judged mainly by visual quality or the performance of the intended task; an enhanced image need not be a more accurate reconstruction of the original scene.</p>
<p>Image restoration attempts to estimate the original image from a degraded observation using a degradation model and available prior knowledge. A common model is <em>g(x,y) = h(x,y) ∗ f(x,y) + n(x,y)</em>, where <em>f</em> is the original image, <em>h</em> is the degradation function and <em>n</em> is noise. Inverse filtering and Wiener filtering are typical restoration methods. The aim is reconstruction accuracy under the stated model.</p>
<p>The distinction is therefore mainly <strong>task-oriented improvement versus model-based reconstruction</strong>. The two areas overlap: a restored image may also look enhanced, and an enhancement method may assist later restoration or analysis. Neither method is guaranteed to improve every image or every task.</p>`,
    chinese: `<p>图像增强和图像恢复都对输入图像进行处理，以提高图像质量或使其更适合观察、分析和识别，但二者的主要目的与依据不同。</p>
<p><strong>图像增强</strong>按照视觉效果或具体任务需要，突出图像中有用的信息，通常不要求建立明确的退化模型。例如，对比度拉伸、直方图均衡化和锐化都属于常见增强方法。增强主要根据视觉质量或任务效果评价，增强后的图像不一定更准确地接近原始场景。</p>
<p><strong>图像恢复</strong>根据退化模型和先验知识，由退化图像估计原图。常用模型为 <em>g(x,y)=h(x,y)∗f(x,y)+n(x,y)</em>，其中 f 为原图，h 为退化函数，n 为噪声。逆滤波和维纳滤波是典型恢复方法。其主要目标是在所用模型下减小重建误差。</p>
<p>因此，增强偏重<strong>面向视觉或任务的信息突出</strong>，恢复偏重<strong>依据模型估计原图</strong>。二者具有联系和交叉：恢复结果可能同时改善观感，增强也可能为后续分析提供帮助，不能将二者机械地划分为绝对主观与绝对客观。</p>`,
    scoring: ['先写共同目的，并说明二者可重叠','增强：任务或视觉驱动，通常不要求显式退化模型','恢复：退化模型 g=h∗f+n、先验与原图估计','各举至少一个方法，说明评价依据不同']
  },
  20: {
    status: '方法范本与补充算例完整；课堂原题数据仍待补充。',
    english: `<p>For image interpolation, first map the output pixel to a continuous input-image coordinate <em>(x,y)</em>. The coordinate mapping and boundary rule must be stated, because different pixel-center conventions can give different numerical answers.</p>
<p><strong>Nearest-neighbor interpolation</strong> copies the value of the closest input pixel: <em>g(x,y)=f(round(x),round(y))</em>, with a specified rule for half-integer ties. It is fast and does not generate new intensity levels, but may produce blocky regions and jagged boundaries when an image is enlarged.</p>
<p><strong>Bilinear interpolation</strong> uses the four surrounding samples. Let <em>x=x₀+α</em> and <em>y=y₀+β</em>, where <em>0≤α,β≤1</em>, and denote the four values by f₀₀, f₁₀, f₀₁ and f₁₁. Then</p>
<p class="formula">g=(1−α)(1−β)f₀₀+α(1−β)f₁₀+(1−α)βf₀₁+αβf₁₁.</p>
<p>The four weights are nonnegative and sum to one. Equivalently, perform two linear interpolations along x and then one along y. Bilinear interpolation is usually smoother than nearest neighbor, but may soften edges.</p>
<p><strong>Supplementary worked example, not the missing classroom data:</strong> let f₀₀=10, f₁₀=20, f₀₁=30 and f₁₁=40, and estimate the value at (0.25,0.5). The upper and lower interpolated values are 12.5 and 32.5, so the bilinear result is <strong>22.5</strong>. If half-integer ties select the larger coordinate, nearest neighbor selects (0,1), giving <strong>30</strong>. The actual classroom numerical answer requires its original data.</p>`,
    chinese: `<p>插值计算首先把输出像素映射回输入图像中的连续坐标 (x,y)，并说明坐标对齐和边界处理约定。不同的像素中心对齐方式可能得到不同数值。</p>
<p><strong>最近邻插值</strong>选取距离该连续坐标最近的输入像素，复制其灰度，可写为 g(x,y)=f(round(x),round(y))，但必须说明半整数的取整规则。该方法速度快，不产生新的灰度级，放大时容易出现块状和锯齿边缘。</p>
<p><strong>双线性插值</strong>利用周围四个像素加权。令 x=x₀+α、y=y₀+β，0≤α,β≤1，四角灰度依次为 f₀₀、f₁₀、f₀₁、f₁₁，则</p>
<p class="formula">g=(1−α)(1−β)f₀₀+α(1−β)f₁₀+(1−α)βf₀₁+αβf₁₁。</p>
<p>四个权重均非负且和为1。也可先沿 x 对上下两边分别线性插值，再沿 y 插值。双线性通常比最近邻平滑，但可能使边缘变软。</p>
<p><strong>补充算例，不是缺失的课堂原题：</strong>四角为10、20、30、40，求 (0.25,0.5)。上边得到 0.75×10+0.25×20=12.5，下边得到 0.75×30+0.25×40=32.5，最后 0.5×12.5+0.5×32.5=<strong>22.5</strong>。若最近邻在半格处取较大坐标，则取 (0,1)，结果为<strong>30</strong>。课堂原题的最终数值仍需原始数据才能确定。</p>`,
    scoring: ['先交代连续坐标映射、边界和取整约定','最近邻：选最近采样点并复制值','双线性：完整四项权重公式、权重和为1','写出逐步代入结果并区分方法效果','明确补充算例不等于课堂原题']
  },
  21: {
    english: `<p>The three additive primaries of <strong>light</strong> are <strong>red, green and blue (RGB)</strong>. Adding two primaries gives a secondary color: red+green gives yellow, green+blue gives cyan, and blue+red gives magenta.</p>
<p>A primary color and its complement together contain all three additive components. The complementary pairs are <strong>red–cyan, green–magenta and blue–yellow</strong>. With suitable relative intensities, each primary light plus its complementary light produces <strong>white</strong>. For example, cyan contains green and blue, so red+cyan supplies red, green and blue.</p>
<p>In the ideal subtractive model, the primary colors of <strong>pigments</strong> are <strong>cyan, magenta and yellow (CMY)</strong>. Cyan absorbs red light, magenta absorbs green, and yellow absorbs blue. Combining two ideal subtractive primaries gives red, green or blue: magenta+yellow gives red, cyan+yellow gives green, and cyan+magenta gives blue.</p>
<p>The complementary pigment pairs are therefore <strong>cyan–red, magenta–green and yellow–blue</strong>. An ideal primary pigment mixed with its complement absorbs all three primary light components and produces <strong>black</strong>. Actual pigments are imperfect, so the result may be a dark muddy color rather than ideal black; printing commonly adds a separate black component K.</p>`,
    chinese: `<p><strong>光的加色三原色</strong>为红、绿、蓝，即 RGB。红光与绿光相加得到黄光，绿光与蓝光相加得到青光，蓝光与红光相加得到品红光。</p>
<p>光的互补色配对为<strong>红—青、绿—品红、蓝—黄</strong>。一种原色光与其互补色光在适当强度下相加，恰好补齐 RGB 三个分量，因此得到<strong>白光</strong>。例如青光含绿、蓝，红光加青光就构成三原色光。</p>
<p><strong>理想颜料的减色三原色</strong>为青、品红、黄，即 CMY。青主要吸收红光，品红主要吸收绿光，黄主要吸收蓝光。两种理想减色原色混合时：品红与黄得到红，青与黄得到绿，青与品红得到蓝。</p>
<p>颜料的互补色配对为<strong>青—红、品红—绿、黄—蓝</strong>。理想原色颜料与其互补色颜料混合后，三种原色光都被吸收，因此得到<strong>黑色</strong>。实际颜料的吸收特性并不理想，混合结果可能是暗浊色，因此印刷通常另加黑色 K。</p>`,
    scoring: ['光：RGB、加色及两两混合关系','写全红青、绿品红、蓝黄三组互补关系','原色光加互补色光得到白光，注明适当强度','理想颜料：CMY、吸收关系与对应RGB互补色','理想互补颜料混合得到黑色，区别现实油墨']
  },
  22: {
    english: `<p><strong>RGB</strong> represents a color by its red, green and blue additive components. With normalized components R,G,B∈[0,1], colors lie in a unit cube: (0,0,0) is black, (1,1,1) is white, and the line R=G=B is the achromatic gray axis. In an 8-bit-per-channel representation, each component instead takes an integer value from 0 to 255. RGB is convenient for cameras, displays and digital storage, but intensity and color information are coupled in its three channels.</p>
<p><strong>HSI</strong> represents color by <strong>hue, saturation and intensity</strong>. Hue H specifies the dominant color as an angle around the color axis. Saturation S measures how far the color is from gray; S=0 denotes an achromatic color. Intensity I describes the average light level. A common definition is</p>
<p class="formula">I=(R+G+B)/3,<br>S=1−3min(R,G,B)/(R+G+B), when R+G+B&gt;0.</p>
<p>For example, RGB=(0.3,0.6,0.9) gives I=0.6 and S=0.5. For R=G=B&gt;0, S=0 and hue is undefined. At black, the saturation formula also needs a special convention; software may set H=S=0 for convenience.</p>
<p>RGB is particularly suitable for acquisition and display. HSI is useful when processing intensity separately from color, for example by enhancing I while retaining H and S as far as the output RGB gamut permits. HSI is a different model from HSV and HSL; in particular, HSI intensity is not HSV's maximum channel value.</p>`,
    chinese: `<p><strong>RGB 模型</strong>用红、绿、蓝三个加色分量表示颜色。归一化时 R、G、B∈[0,1]，全部颜色构成单位立方体，(0,0,0)为黑，(1,1,1)为白，R=G=B 的对角线为无彩色灰度轴。每通道8位时，各分量也可用0至255的整数表示。RGB 适合摄像、显示和数字存储，但颜色信息与强度信息耦合在三个通道中。</p>
<p><strong>HSI 模型</strong>用色调 H、饱和度 S、强度 I 表示颜色。色调用角度表示颜色类别，饱和度表示颜色偏离灰色的程度，强度表示平均明暗。常用定义为</p>
<p class="formula">I=(R+G+B)/3，<br>S=1−3min(R,G,B)/(R+G+B)，其中 R+G+B&gt;0。</p>
<p>例如 RGB=(0.3,0.6,0.9)，则 I=0.6，S=0.5。对于 R=G=B&gt;0 的灰色，S=0，色调没有唯一意义。黑色的饱和度公式也需单独约定，程序可为方便将 H、S 均设为0。</p>
<p>RGB 便于图像采集和显示；HSI 便于将强度与颜色分开处理，例如主要增强 I 而尽量保留 H、S，但转换回 RGB 时仍需注意可表示的色域。HSI 与 HSV、HSL 不能混用，尤其 HSI 的 I 是三个通道的平均值，而 HSV 的 V 是最大通道值。</p>`,
    scoring: ['RGB三个分量、加色立方体、黑白及灰轴','HSI三个英文全称与各自物理含义','I与S公式及黑色/无彩色色调的特殊情况','RGB与HSI的主要应用及联系','不混淆HSI与HSV/HSL']
  },
  23: {
    english: `<p>A <strong>pseudo-color image</strong> is obtained by assigning artificial colors to the gray levels of a monochrome image or to values of another single-channel measurement. Its purpose is to make small value differences or important ranges easier to distinguish and interpret. The assigned colors do not necessarily represent the object's true colors.</p>
<p>One method is <strong>intensity slicing</strong>, also called density slicing. Divide the gray-level range into intervals and assign one color to each interval. Every pixel receives the color associated with its interval. For example, an 8-bit image may use blue for 0–84, green for 85–169 and red for 170–255. A pixel with intensity 120 is then displayed in green. This method is useful for highlighting selected value bands.</p>
<p>A second method is <strong>gray-level-to-color transformation</strong>. Design three functions R=T<sub>R</sub>(r), G=T<sub>G</sub>(r), and B=T<sub>B</sub>(r), or use an equivalent lookup table, so that each input intensity r is mapped to an RGB triplet. The functions may vary continuously to give a smooth color scale.</p>
<p>A legend should show which colors correspond to which values. Pseudo-color changes the visual representation of existing measurements; it does not recover true scene colors or create additional measured information.</p>`,
    chinese: `<p><strong>伪彩色图像</strong>是按照人为规定的映射，将单色图像的灰度值或其他单通道测量值赋予颜色所得的图像。其目的是利用颜色突出细小差异和重要数值区间，便于观察与解释；这些颜色不一定是物体的真实颜色。</p>
<p>第一种方法为<strong>灰度分层</strong>，也称密度分层。把灰度范围划分成若干区间，每个区间指定一种颜色，像素根据其灰度所属区间着色。例如，对8位图像，将0–84设为蓝色、85–169设为绿色、170–255设为红色，则灰度为120的像素显示为绿色。该方法适合突出某些数值范围。</p>
<p>第二种方法为<strong>灰度到彩色变换</strong>。构造三个映射函数 R=T<sub>R</sub>(r)、G=T<sub>G</sub>(r)、B=T<sub>B</sub>(r)，或等价的查找表 LUT，使每个输入灰度 r 对应一个 RGB 三元组。采用连续变化的映射，可形成平滑色阶，减少分层边界。</p>
<p>应用时应给出色标，说明颜色与原始数值的对应关系。伪彩色只是重新显示已有数据，既不能恢复物体真实光谱颜色，也不能凭空增加原始测量信息。</p>`,
    scoring: ['定义：人为灰度到颜色映射，说明可视化目的','方法一：灰度分层、区间和赋色步骤','方法二：三通道映射函数或LUT','举一个可操作例子并说明色标','区分伪彩色与恢复真实颜色']
  },
  25: {
    english: `<p>Compression fidelity measures how closely a reconstructed image g approximates the original image f. Let e(x,y)=g(x,y)−f(x,y) and let the image contain K=MN pixels. Common criteria are <strong>objective numerical measures</strong> and <strong>subjective visual measures</strong>.</p>
<p>The <strong>mean squared error</strong> and <strong>root mean square error</strong> are</p>
<p class="formula">MSE=(1/K)Σ<sub>x,y</sub>e(x,y)²,<br>RMSE=√MSE.</p>
<p>Smaller values indicate less pixelwise distortion; RMSE has the same unit as the pixel intensity. Using original-image energy as the signal-energy convention, define</p>
<p class="formula">SNR<sub>ms</sub>=Σf²/Σe²,<br>SNR<sub>rms</sub>=√(Σf²/Σe²),<br>SNR<sub>dB</sub>=10log₁₀(SNR<sub>ms</sub>)=20log₁₀(SNR<sub>rms</sub>).</p>
<p>Some texts use reconstructed-image energy Σg² in the numerator; the convention must be stated. A larger SNR indicates less error relative to the stated signal energy.</p>
<p>The <strong>peak signal-to-noise ratio</strong> is PSNR=10log₁₀(MAX²/MSE) dB, where MAX is the maximum representable intensity, such as 255 for an unsigned 8-bit image. At a fixed range, larger PSNR generally means lower error. If MSE=0, RMSE=0 and PSNR is positive infinity.</p>
<p><strong>Subjective criteria</strong> use human judgments under specified viewing conditions, for example ratings of overall quality or visible distortion. Numerical errors do not fully predict perceived quality, so objective and subjective evaluation are complementary. Compression ratio and entropy describe coding or data size, not reconstruction fidelity.</p>`,
    chinese: `<p>压缩保真度衡量重建图像 g 与原图 f 的接近程度。令误差 e(x,y)=g(x,y)−f(x,y)，图像共有 K=MN 个像素。常用准则包括<strong>客观数值准则</strong>和<strong>主观视觉准则</strong>。</p>
<p>均方误差与均方根误差分别为</p>
<p class="formula">MSE=(1/K)Σ<sub>x,y</sub>e(x,y)²，<br>RMSE=√MSE。</p>
<p>二者越小，表示逐像素失真越小；RMSE 与像素强度具有相同单位。若采用原图能量作为信号能量，则</p>
<p class="formula">SNR<sub>ms</sub>=Σf²/Σe²，<br>SNR<sub>rms</sub>=√(Σf²/Σe²)，<br>SNR<sub>dB</sub>=10log₁₀(SNR<sub>ms</sub>)=20log₁₀(SNR<sub>rms</sub>)。</p>
<p>有些教材将分子写成重建图能量 Σg²，计算时应明确并遵循课程所用约定。信噪比越大，表示相对于所选信号能量，重建误差越小。</p>
<p>峰值信噪比为 PSNR=10log₁₀(MAX²/MSE)，单位 dB。MAX 是最大可表示灰度，8位无符号图像取255。在相同动态范围下，PSNR 越大通常失真越小。当 MSE=0 时，RMSE=0，PSNR 为正无穷。</p>
<p>主观准则让观察者在规定的观看条件下，对总体质量或可见失真评分。由于误差位置、结构和纹理会影响观感，客观数值不能完全替代人的观察，应结合使用。压缩率和熵反映编码与数据量，不属于重建保真度准则。</p>`,
    scoring: ['定义原图、重建图及误差','MSE、RMSE完整公式及大小意义','区分SNR能量比、RMS比与dB表达，注明分子约定','PSNR公式、MAX与MSE=0特殊情况','主观评价方法与客观指标的局限']
  },
  26: {
    english: `<p><strong>Huffman coding</strong> is a lossless variable-length prefix coding method. It assigns shorter codewords to more probable symbols and longer codewords to less probable symbols. No codeword is a prefix of another, so the encoded stream can be decoded unambiguously.</p>
<p>To construct a binary Huffman code, list all symbols with their probabilities. Repeatedly combine the two nodes with the smallest probabilities into a new node whose probability is their sum. Continue until one root remains. Assign 0 and 1 to the two branches at every split, then read each symbol's codeword along the path from root to leaf. The method minimizes average length among binary symbol-by-symbol prefix codes for the given probabilities.</p>
<p>For probabilities pᵢ and codeword lengths lᵢ, the four quantities are</p>
<p class="formula">H=−Σpᵢlog₂pᵢ,<br>L̄=Σpᵢlᵢ,<br>η=H/L̄,<br>R<sub>relative</sub>=1−η.</p>
<p>H is the average information per symbol, L̄ is the actual average bits per symbol, η is coding efficiency, and R<sub>relative</sub> is relative coding redundancy. The excess length L̄−H is another redundancy measure, in bits per symbol, and must not be confused with the relative measure.</p>
<p><strong>Worked example:</strong> for A,B,C,D with probabilities 0.4,0.3,0.2,0.1, merge 0.1+0.2=0.3, then 0.3+0.3=0.6, and finally 0.4+0.6=1. One valid code is A=0, B=10, C=110, D=111. Thus L̄=1.9, H≈1.84644 bits/symbol, η≈97.18%, and R<sub>relative</sub>≈2.82%. Bit labels and equal-probability choices may produce different valid codewords.</p>`,
    chinese: `<p><strong>Huffman 编码</strong>是一种无损的变长前缀编码方法，为高概率符号分配较短码字，为低概率符号分配较长码字。任何码字都不是其他码字的前缀，因此可进行无歧义解码。</p>
<p>二进制 Huffman 码的构造步骤为：列出符号及概率，每次选择概率最小的两个节点合并，新节点概率等于二者之和；不断重复直到形成唯一根节点；为每个分叉的两条边分配0、1，最后从根走到各叶节点，路径上的比特串就是符号的码字。对于给定符号概率，该方法在二进制逐符号前缀码中使平均码长最小。</p>
<p>设符号概率为 pᵢ，码长为 lᵢ，则</p>
<p class="formula">熵 H=−Σpᵢlog₂pᵢ，<br>平均码长 L̄=Σpᵢlᵢ，<br>编码效率 η=H/L̄，<br>相对编码冗余 R=1−η。</p>
<p>H 表示平均信息量，L̄ 表示编码后每符号实际平均比特数，η 表示接近熵限的程度，R 表示相对于平均码长的冗余比例。L̄−H 也可衡量多用的比特数，但其单位是 bit/符号，与相对冗余不是同一个量。</p>
<p><strong>算例：</strong>A、B、C、D 概率为0.4、0.3、0.2、0.1。依次合并0.1+0.2=0.3、0.3+0.3=0.6、0.4+0.6=1，可得一组合法码 A=0、B=10、C=110、D=111。于是 L̄=0.4×1+0.3×2+0.2×3+0.1×3=<strong>1.9 bit/符号</strong>，H≈<strong>1.84644 bit/符号</strong>，η≈<strong>97.18%</strong>，相对冗余≈<strong>2.82%</strong>。交换分支0、1或改变等概率节点的选择，可能得到不同但同样有效的码字。</p>`,
    scoring: ['变长、无损、前缀无歧义三项核心性质','完整写出最小两概率合并与根到叶赋码算法','熵、平均码长、效率、冗余的定义公式及单位','概率例题的树构造、码字与指标一致','注明相对冗余与超额比特的区别、码字不唯一']
  },
  27: {
    english: `<p><strong>Predictive coding</strong> exploits the correlation between neighboring image pixels. Instead of coding every pixel value independently, it predicts the current pixel from previously coded or reconstructed neighbors and codes the prediction error.</p>
<p>Let the actual pixel be f(x,y) and its prediction be f<sub>p</sub>(x,y). The encoder calculates the residual</p>
<p class="formula">e(x,y)=f(x,y)−f<sub>p</sub>(x,y).</p>
<p>The error is optionally quantized and then encoded. At the decoder, the same predictor forms the same prediction from available reconstructed neighbors, and the reconstructed pixel is obtained by adding the decoded residual to that prediction. The scan order, predictor, initial values and boundary treatment must be known at both ends. In lossy predictive coding, the encoder also uses reconstructed samples in its feedback predictor so that it agrees with the decoder.</p>
<p>For a good predictor, errors are usually concentrated near zero, with a narrower distribution and often lower marginal entropy than the raw intensities. This reduces <strong>interpixel redundancy</strong> and makes entropy coding more efficient. For example, values 100,101,100,102 can be represented by the initial value 100 followed by residuals 1,−1,2 when the previous pixel is the predictor.</p>
<p>If residuals are coded exactly without quantization, prediction can be lossless. Quantizing errors generally introduces loss and may reduce the bit rate further. Savings depend on the predictor and image statistics; small numerical errors alone do not guarantee compression, and a reversible predictor does not discard the image's information.</p>`,
    chinese: `<p><strong>预测编码</strong>利用相邻图像像素之间的相关性。它不独立编码每个原始灰度，而是用已编码或已重建的邻点预测当前像素，再对预测误差进行编码。</p>
<p>设真实像素为 f(x,y)，预测值为 f<sub>p</sub>(x,y)，则残差为</p>
<p class="formula">e(x,y)=f(x,y)−f<sub>p</sub>(x,y)。</p>
<p>编码端可先量化残差，再编码。解码端使用同样的预测器和已重建邻点形成预测值，将解码残差与预测值相加，得到重建像素。双方必须一致地规定扫描顺序、预测器、初值和边界处理。有损预测编码的编码端应通过重建样本反馈预测，避免与解码端的预测失配。</p>
<p>当预测准确时，残差通常集中在0附近，分布更集中，方差及边缘熵常比原始灰度小，因此有利于熵编码。这相当于消除<strong>像素间冗余</strong>。例如像素100、101、100、102，用前一个像素预测，可记录首值100及残差1、−1、2，解码端逐次相加即可恢复。</p>
<p>若不量化且精确编码残差，可实现无损预测编码；若量化残差，通常为有损编码，并可能进一步减少码率。效率取决于预测器和图像统计特性，不能仅凭残差数值小就断言必然省比特；可逆预测本身并没有删除原图的信息。</p>`,
    scoring: ['利用邻点相关性与预测器','残差公式及编码、解码相加重建流程','用近零集中和更低统计冗余解释压缩效率','量化可选，正确区分有损与无损','双方使用一致重建样本预测，交代边界和初值']
  },
  28: {
    english: `<p>Let R be the entire image region. A complete segmentation partitions it into nonempty subregions R₁,R₂,…,Rₙ according to a specified connectivity rule and a homogeneity predicate P. The regions should satisfy the following five conditions.</p>
<p><strong>1. Complete coverage:</strong> ⋃<sub>i=1</sub><sup>n</sup>Rᵢ=R. Every image pixel must belong to the segmentation; none is omitted.</p>
<p><strong>2. Connectivity:</strong> each Rᵢ is connected. Any two pixels in a region can be joined by a path lying entirely inside that region, using the chosen 4-, 8-, or other adjacency convention.</p>
<p><strong>3. Disjointness:</strong> Rᵢ∩Rⱼ=∅ for i≠j. A pixel cannot belong to two different regions.</p>
<p><strong>4. Internal homogeneity:</strong> P(Rᵢ)=TRUE for every i. Each region satisfies the selected uniformity criterion, such as an allowed range of intensities, colors or texture features. Homogeneity need not mean that all pixel values are identical.</p>
<p><strong>5. Separation of adjacent regions:</strong> for distinct adjacent regions, P(Rᵢ∪Rⱼ)=FALSE. Two neighboring final regions cannot be merged while still satisfying the same homogeneity criterion.</p>
<p>Coverage and disjointness make the result a partition. Connectivity imposes a spatial requirement, whereas P specifies the feature-based similarity requirement. The final condition prevents an unnecessarily fine subdivision into neighboring regions that should have been combined.</p>`,
    chinese: `<p>设整幅图像区域为 R，分割得到非空子区域 R₁、R₂、…、Rₙ。先规定邻接方式和同质性谓词 P，一个完整分割应满足以下五个条件。</p>
<p><strong>1. 完整覆盖：</strong>⋃<sub>i=1</sub><sup>n</sup>Rᵢ=R。所有子区域的并集为整幅图像，每个像素都应被划分，不能遗漏。</p>
<p><strong>2. 区域连通：</strong>每个 Rᵢ 都是连通区域。区域内任意两个像素之间，都能找到完全位于该区域内部的路径。计算前应规定4邻接、8邻接等连通约定。</p>
<p><strong>3. 互不重叠：</strong>当 i≠j 时，Rᵢ∩Rⱼ=∅。同一个像素不能同时属于两个不同区域。</p>
<p><strong>4. 区域内同质：</strong>对所有 i，都有 P(Rᵢ)=TRUE。各区域内部满足指定的灰度、颜色或纹理等一致性准则。同质不要求每个像素数值完全相同。</p>
<p><strong>5. 相邻区域不能继续合并：</strong>对于不同且相邻的 Rᵢ、Rⱼ，有 P(Rᵢ∪Rⱼ)=FALSE，即二者合并后不再满足同质性条件。</p>
<p>完整覆盖和互斥保证结果是对图像的划分；连通条件约束空间结构，同质性约束像素特征；最后一个条件避免将本可合并的相邻同质区域过度细分。</p>`,
    scoring: ['覆盖：并集等于完整图像','每个区域在指定邻接下连通','互斥：不同区域交集为空','区域自身满足同质性谓词P','相邻区域的并集不满足P，区别连通与同质']
  },
  29: {
    english: `<p>An image edge is associated with a rapid change of intensity. Derivatives suppress constant regions and emphasize changes, which provides the theoretical basis of derivative-based edge detection.</p>
<p><strong>First-order detection</strong> uses the gradient ∇f=(Gₓ,Gᵧ), where Gₓ≈∂f/∂x and Gᵧ≈∂f/∂y. Its magnitude is |∇f|=√(Gₓ²+Gᵧ²), often approximated by |Gₓ|+|Gᵧ|. Strong gradient responses indicate possible edges; the gradient direction is normal to the local edge. A pair of Sobel masks is</p>
<pre>Gx = −1  0  1       Gy = −1 −2 −1
     −2  0  2             0  0  0
     −1  0  1             1  2  1</pre>
<p>Apply both masks, combine their responses into edge strength, and threshold the magnitude; thinning can be used to localize the edge.</p>
<p><strong>Second-order detection</strong> can use the Laplacian, ∇²f=∂²f/∂x²+∂²f/∂y². One four-neighbor discrete mask is</p>
<pre> 0  1  0
 1 −4  1
 0  1  0</pre>
<p>Near a smoothed step edge, the second derivative changes sign, so significant <strong>zero crossings</strong> can locate the edge. The Laplacian does not directly provide edge orientation. Because differentiation, especially second differentiation, is sensitive to noise, smoothing is usually applied first. A response-change threshold is also needed: a zero value alone is insufficient, since flat regions can have zero Laplacian everywhere. Reversing a mask's overall sign does not change gradient magnitude or the positions of zero crossings.</p>`,
    chinese: `<p>边缘通常对应灰度的快速变化。微分运算在恒定区域响应接近0，而在灰度变化处产生明显响应，因此可用于检测边缘。</p>
<p><strong>一阶微分检测</strong>使用梯度 ∇f=(Gₓ,Gᵧ)，其中 Gₓ、Gᵧ 近似为沿 x、y 的偏导数。梯度幅值为 |∇f|=√(Gₓ²+Gᵧ²)，也常用 |Gₓ|+|Gᵧ| 近似。较大的梯度幅值指示候选边缘，梯度方向与局部边缘切线大致垂直。可采用 Sobel 模板：</p>
<pre>Gx = −1  0  1       Gy = −1 −2 −1
     −2  0  2             0  0  0
     −1  0  1             1  2  1</pre>
<p>分别计算两模板响应，合成幅值后进行阈值检测，必要时再细化定位边缘。</p>
<p><strong>二阶微分检测</strong>可使用拉普拉斯算子 ∇²f=∂²f/∂x²+∂²f/∂y²。四邻域模板为：</p>
<pre> 0  1  0
 1 −4  1
 0  1  0</pre>
<p>对于平滑阶跃边缘，二阶响应在边缘附近发生符号改变，可用具有足够响应变化幅度的<strong>过零点</strong>定位边缘。拉普拉斯本身不直接给出边缘方向。微分特别是二阶微分对噪声敏感，通常先平滑，再结合响应阈值排除噪声与无意义过零。仅有拉普拉斯值等于0不能证明是边缘，因为平坦区域也可处处为0。模板整体变号通常不影响幅值或过零位置，但计算约定必须一致。</p>`,
    scoring: ['从边缘灰度快速变化解释微分依据','一阶梯度分量、幅值和方向含义','给出一对完整Sobel模板及合成方法','二阶拉普拉斯公式、完整模板和过零依据','噪声敏感、先平滑及过零幅度条件']
  },
  30: {
    english: `<p><strong>Region growing</strong> is a similarity-based segmentation method that starts from one or more seed pixels and enlarges each region by adding neighboring pixels that satisfy a specified membership criterion.</p>
<p>First select representative seeds inside the objects of interest, assign them region labels, and specify a connectivity rule, such as 4- or 8-connectivity. Next define a similarity predicate, for example |f(p)−μ<sub>R</sub>|≤T, where μ<sub>R</sub> is the current region mean and T is a chosen tolerance. Put boundary neighbors into a candidate queue. Repeatedly examine unassigned candidates, add those satisfying the predicate, update the region statistics, and examine their neighbors. Continue until no further eligible neighbor can be added. Both spatial adjacency and similarity are necessary.</p>
<p>Practical implementation must resolve several issues. Seeds must be representative, and the number and placement of seeds affect the result. The feature space and tolerance must match the task, using intensity, color or texture as appropriate. The algorithm must specify whether comparison is with the seed, a fixed reference, or updated region statistics. Multiple growing regions need consistent ownership and conflict rules.</p>
<p>Noise, gradual intensity changes and weak boundaries may cause fragmentation or leakage into another object. Preprocessing, edge constraints and suitable stopping or merging rules may help. Unassigned pixels and small residual regions must also be handled. A distant pixel cannot join a region merely because its intensity is similar; it must be reached through the chosen connectivity.</p>`,
    chinese: `<p><strong>区域生长</strong>是一种基于相似性的图像分割方法。从一个或多个种子像素出发，不断吸收满足规定条件的邻接像素，使区域逐步扩大。</p>
<p>实现时，先在目标内部选择有代表性的种子并赋予区域标签，同时规定4邻接或8邻接等连通规则。然后定义相似性判据，例如 |f(p)−μ<sub>R</sub>|≤T，其中 μ<sub>R</sub> 是当前区域均值，T 是允许差异。将边界邻点放入候选队列，反复检查未分配候选点，把满足判据者加入区域，更新统计量，再检查新加入点的邻点，直到没有可继续加入的像素。整个过程必须同时满足空间相邻和特征相似。</p>
<p>实际应用首先要解决种子的数量、位置与代表性问题，再选择适合任务的灰度、颜色或纹理特征及相似阈值。还要说清比较对象是固定种子、固定参考值还是随生长变化的区域统计量，并制定多个区域竞争时的归属规则。</p>
<p>噪声、缓慢灰度渐变和较弱边界可能造成区域破碎或跨边界泄漏，可结合去噪、边缘约束及合理的停止或合并规则。同时需要处理未分配像素和细小残余区域。远处像素即使灰度相同，也不能跳过连通条件直接并入区域。</p>`,
    scoring: ['从种子逐步合并相似邻点的基本思想','完整算法：种子、邻接、判据、候选检查、更新、停止','实际问题：种子选择与特征/阈值选择','明确比较对象与多区域竞争规则','噪声、弱边界泄漏、剩余区域等处理']
  },
  31: {
    english: `<p>For an image with a bimodal histogram, foreground and background often form two distinguishable intensity groups. A basic <strong>automatic global threshold</strong> can be estimated by the iterative two-class-mean method.</p>
<p><strong>1.</strong> Choose an initial threshold T₀, for example the image mean, and specify a small tolerance ε and a maximum iteration count. For a nonconstant image, the initial threshold should separate the minimum and maximum intensities.</p>
<p><strong>2.</strong> Using the current threshold T, partition the pixels into G₁={p:f(p)&gt;T} and G₂={p:f(p)≤T}.</p>
<p><strong>3.</strong> Calculate the mean intensities μ₁ and μ₂ of the two groups. If a histogram is used, weight each intensity by its pixel count.</p>
<p><strong>4.</strong> Update the threshold to T<sub>new</sub>=(μ₁+μ₂)/2.</p>
<p><strong>5.</strong> Repeat the partition and update until |T<sub>new</sub>−T|&lt;ε, or stop at the iteration limit. Finally set g(p)=1 if f(p)&gt;T and g(p)=0 otherwise, according to the chosen foreground convention.</p>
<p>For example, intensities 10,12,14,100,104 with T₀=50 give group means 12 and 102, so T₁=57. The next partition is unchanged and T₂=57; the binary labels are 0,0,0,1,1. Constant images and empty groups require special handling to avoid division by zero. A single global threshold works best when the two distributions are sufficiently separated and illumination is reasonably uniform. This update rule is the iterative mean method, not Otsu's between-class-variance criterion.</p>`,
    chinese: `<p>对于双峰直方图，目标与背景通常形成两个较可分的灰度群，可使用<strong>两类均值中点迭代法</strong>自动确定全局阈值。</p>
<p><strong>1. 初始化：</strong>选择初始阈值 T₀，例如全图平均灰度，设定较小的终止容差 ε 和最大迭代次数。对于非常量图像，初值应位于最小和最大灰度之间，使两组均有像素。</p>
<p><strong>2. 分组：</strong>按照当前 T，将像素划分为 G₁={p:f(p)&gt;T}、G₂={p:f(p)≤T}，相等时的归属约定保持一致。</p>
<p><strong>3. 求均值：</strong>分别计算两组均值 μ₁、μ₂。若通过直方图计算，应按各灰度的像素数加权。</p>
<p><strong>4. 更新：</strong>令新阈值 T<sub>new</sub>=(μ₁+μ₂)/2。</p>
<p><strong>5. 迭代和输出：</strong>反复分组、求均值、更新，直到 |T<sub>new</sub>−T|&lt;ε，或达到迭代上限；最后按约定用最终 T 将整幅图二值化，例如 f(p)&gt;T 置1，其余置0。</p>
<p>例如灰度10、12、14、100、104，取 T₀=50，暗组均值12、亮组均值102，得到 T₁=57。再次分组不变，T₂=57，因此停止，二值结果为0、0、0、1、1。常量图像和空组应单独处理，避免除以0。本方法适合两类灰度较可分、照明较均匀的情况；它与 Otsu 最大类间方差法的准则不同，不能混写更新公式。</p>`,
    scoring: ['初始化阈值、容差与迭代上限','明确两组定义及相等灰度归属','按像素数量加权求两组均值','中点更新公式与收敛条件','最终二值化、空组/常量图像和适用条件']
  },
  32: {
    english: `<p><strong>Region representation</strong> specifies how a segmented object is stored, whereas <strong>region description</strong> extracts measurable properties from that stored object for analysis, comparison or recognition.</p>
<p>A region may be represented externally by its boundary, for example an ordered list of contour points, a polygon or a chain code. It may also be represented internally by all its pixels, using a binary mask, a pixel set or run-length records. A boundary representation is convenient when contour shape is central to the task, while a full-region representation retains interior information needed for area, intensity or texture analysis.</p>
<p>Description converts the chosen representation into a set of descriptors, often a feature vector. Typical descriptors include area, perimeter, centroid, compactness, moments and texture statistics. For example, storing the six foreground pixels of a 3-by-2 binary rectangle is a representation; calculating its area A=6 pixels from that set is a description.</p>
<p>The two concepts are therefore connected but distinct: representation supplies the data, and description summarizes selected properties of those data. The representation and descriptors should be chosen together according to the recognition task. If objects must be recognized despite translation, rotation or scale change, suitable normalization or invariant descriptors are needed. Such invariance is not automatic: centroid changes with translation, and area changes with scale.</p>`,
    chinese: `<p><strong>区域表示</strong>回答“怎样存储分割出的对象”，<strong>区域描述</strong>回答“从该对象中提取哪些可用于分析、比较或识别的性质”。</p>
<p>区域可通过其外部边界表示，例如有序轮廓点、边界多边形、链码；也可通过完整内部区域表示，例如二值掩膜、像素集合或游程记录。若任务主要关心轮廓形状，边界表示较方便；若需分析面积、内部灰度或纹理，则完整区域表示更合适。</p>
<p>区域描述在表示的基础上提取描述子，通常形成特征向量。常见描述子包括面积、周长、质心、紧致度、矩和纹理统计量。例如，将一个3×2二值矩形的6个前景像素保存下来属于表示；由像素集合计算面积 A=6 像素属于描述。</p>
<p>二者的关系是：表示为描述提供原始对象数据，描述将选定性质转化为适合分析的量。应根据识别目标同时选择表示方式和描述子。若要求对平移、旋转或尺度变化保持稳定，还需适当归一化或构造不变描述子。并非所有特征天然不变，例如质心随位置改变，面积随尺度改变。</p>`,
    scoring: ['清楚区分存储结构与特征提取','边界表示和完整区域表示及例子','列举多个描述子及其用途','用同一个对象说明表示到描述的关系','说明任务选择与不变性需要']
  },
  33: {
    english: `<p>Use the original arrowed contour recovered from the Word document. State the direction convention as <strong>0=right, 1=up, 2=left, 3=down</strong>, start at the upper-left corner, and follow the arrows for one complete traversal. The original figure does not explicitly label a starting point or direction-numbering table, so this convention is part of the answer.</p>
<p>The successive moves are right×3, down×2, left, up, left, down, left, up×2. Thus the <strong>4-direction chain code</strong> is</p>
<pre>c = 0 0 0 3 3 2 1 2 3 2 1 1
  = 000332123211.</pre>
<p>Define the cyclic first difference by dᵢ=(cᵢ₊₁−cᵢ) mod4, taking c₁₂=c₀. The last-to-first pair must be included. This gives</p>
<pre>d = 0 0 3 0 3 3 1 1 3 3 0 3
  = 003033113303.</pre>
<p>This is the <strong>rotation-normalized cyclic differential chain code</strong>. A rotation by an integer multiple of 90° adds the same offset to all absolute direction codes; subtraction removes that offset modulo four.</p>
<p>The <strong>shape number</strong> is the lexicographically smallest cyclic shift of d. In this case it is <strong>003033113303</strong>, unchanged from the displayed difference string. It removes dependence on the starting point while preserving leading zeros and the traversal order. Different absolute starting points may change c, but yield cyclic shifts of the same difference string. This normalization does not automatically remove changes of scale, reversal of traversal, or arbitrary-angle resampling.</p>`,
    chinese: `<p>采用从 Word 文档恢复的原始箭头轮廓。规定<strong>0=右、1=上、2=左、3=下</strong>，从左上角开始，沿箭头绕行一周。由于原图没有明确标出起点和方向编号表，应先将本解采用的约定写在答卷上。</p>
<p>行走顺序为：右3步、下2步、左1步、上1步、左1步、下1步、左1步、上2步。因此<strong>四方向链码</strong>为：</p>
<pre>c = 0 0 0 3 3 2 1 2 3 2 1 1
  = 000332123211。</pre>
<p>定义循环一阶差分 dᵢ=(cᵢ₊₁−cᵢ) mod4，并令 c₁₂=c₀。包括最后一个方向到第一个方向的差，逐项得到：</p>
<pre>d = 0 0 3 0 3 3 1 1 3 3 0 3
  = 003033113303。</pre>
<p>该序列就是<strong>旋转归一化的循环差分链码</strong>。轮廓按90°整数倍整体旋转时，所有绝对方向码增加同一常数，作差再取模4即可消去该常数。</p>
<p><strong>形状数</strong>是差分序列全部循环移位中字典序最小的一串。本题最小串仍为<strong>003033113303</strong>。该步骤统一起点，同时保留前导0和绕行先后次序。更换起点时，绝对链码可能改变，差分链码只发生循环移位，形状数不变；但尺度改变、反向绕行和任意角度重新采样不会由这些步骤自动消除。</p>`,
    scoring: ['先声明方向编号、左上角起点与沿箭头绕行','原图12步对应链码000332123211','首尾相连取模4，差分003033113303','求差分最小循环移位得到形状数','说明旋转和起点归一化的作用及限制']
  },
  34: {
    status: '方法范本完整；缺少可确认的第34题独立原图，原题数值答案待补。',
    english: `<p>To obtain an <strong>8-direction chain code</strong>, first specify the direction table, starting point and traversal direction. Use x increasing to the right and y increasing upward, and number the directions counterclockwise: 0=right, 1=upper-right, 2=up, 3=upper-left, 4=left, 5=lower-left, 6=down, 7=lower-right. Trace the boundary once and record the direction cᵢ of every step.</p>
<p>The <strong>rotation-normalized cyclic first difference</strong> is dᵢ=(cᵢ₊₁−cᵢ) mod8, including the last-to-first pair. Rotating the coded contour by an integer multiple of 45° adds a common direction offset, which this subtraction removes modulo eight. The <strong>shape number</strong> is the smallest cyclic shift of the complete difference string, with all leading zeros retained. Reversing the traversal is not merely changing its starting point and is not automatically normalized.</p>
<p><strong>Illustrative example only:</strong> for the contour (0,0)→(1,1)→(0,2)→(−1,1)→(0,0), the directions are 1,3,5,7, so c=<strong>1357</strong>. The cyclic differences are (3−1,5−3,7−5,1−7) mod8=<strong>2222</strong>. Every cyclic shift is identical, hence the shape number is <strong>2222</strong>. All four steps are diagonal, so their geometric length on a unit grid is 4√2.</p>
<p>The supplied document contains one identified contour anchored to Question 33 but no separately confirmed diagram for Question 34. Consequently, 1357 and 2222 are answers to this illustrative contour, not established numerical answers to the missing original figure.</p>`,
    chinese: `<p>计算<strong>八方向链码</strong>前，先规定方向编号、起点和绕行方向。本解采用 x 向右、y 向上，从右方开始逆时针编号：0右、1右上、2上、3左上、4左、5左下、6下、7右下。沿边界走一圈，每步记录其方向 cᵢ。</p>
<p><strong>旋转归一化循环差分</strong>为 dᵢ=(cᵢ₊₁−cᵢ) mod8，必须包括最后一步到第一步的差。轮廓按45°整数倍旋转时，各方向码增加同一偏移量，差分将其消去。<strong>形状数</strong>为完整差分串的最小循环移位，保留全部前导0。反向绕行不等于改变起点，不会自动被该归一化消除。</p>
<p><strong>仅作方法示例：</strong>轮廓为 (0,0)→(1,1)→(0,2)→(−1,1)→(0,0)，方向依次为1、3、5、7，因此链码 c=<strong>1357</strong>。循环差分为 (3−1,5−3,7−5,1−7) mod8=<strong>2222</strong>；各循环移位相同，形状数亦为<strong>2222</strong>。该轮廓有4个斜步，在单位网格上的几何路径长度为4√2。</p>
<p>目前作业中能确认的唯一轮廓图锚定在第33题之后，没有找到可独立确认的第34题图形。因此1357和2222是上述示例的答案，不能冒充原题的最终数值解；取得第34题原图后，按同样三步计算即可。</p>`,
    scoring: ['写全八方向编号与绕行约定','逐步记录原始方向码','首尾相接、差分取模8','从完整差分串求最小循环移位','明确示例与原题缺图状态，不编造原题数值']
  }
};
