window.PRIORITY_IDS=[1,2,3,7,8,9,10,12,13,14,15,17,18,20,24,25,26,27,28,30];
window.UNCERTAIN_IDS=[5,29];
/* Textbook exercises 2.9 and 8.9 were completed from the supplied photos. */
const recoveredQuestions=[
 {
  id:1,title:'图像传输的数据量与时间 · 教材 2.9',topic:'图像基础',
  en:'Transmit a 1024 × 1024 image with 256 gray levels. Each 8-bit data byte is sent with one start bit and one stop bit. Calculate the image data, transmission overhead, and transmission times at 56 Kbaud and 3000 Kbaud. Assume one bit per symbol and K = 1000.',
  zh:'传输一幅 1024 × 1024、256 灰度级图像。每个数据字节含 8 位，另加 1 位起始位和 1 位停止位。求数据量、传输开销，以及 56 Kbaud 与 3000 Kbaud 下的传输时间；每符号 1 bit，K = 1000。',
  note:'教材 2.9 已根据补充照片恢复。原作业还列了 2.15，但老师在第 1 题旁特别注明 2.9；本题范本与练习覆盖已补齐的 2.9。',
  problemHtml:'<div class="example"><strong>原题数据 · 教材 2.9</strong><p>图像为 1024 × 1024 像素、256 灰度级。每个数据字节含 8 位，传输时另加 1 个起始位和 1 个停止位。传输速率分别为 56 Kbaud、3000 Kbaud。假设 one bit per symbol，K = 1000。</p><p>要求：写出图像数据量、传输开销、总传输位数及两种速率下的传输时间，并列出计算过程。</p></div>',
  cues:[{en:'256 gray levels',zh:'先确定每像素位数'},{en:'start bit and stop bit',zh:'每个字节另加传输开销'},{en:'one bit per symbol',zh:'题中波特率与比特率数值相同'}],
  intuition:'像素数据好比包裹里的物品，起始位和停止位好比每件包裹的包装。传输时间要用物品加包装的总位数除以每秒传输的位数。',
  points:[
   {label:'由灰度级数求有效数据量',text:'256 = 2⁸，每像素需 8 bit。像素数 N = 1024 × 1024 = 1,048,576；有效数据量 B = 8N = 8,388,608 bit，即 1,048,576 byte。',en:'With log₂256 = 8 bits per pixel, the image payload is 1024 × 1024 × 8 = 8,388,608 bits.',aliases:['256','8 bit','8位','8388608','8,388,608','1048576','payload']},
   {label:'每字节加入两位开销',text:'每像素正好一个字节，每个字节发出 8 + 1 + 1 = 10 bit。开销为 2N = 2,097,152 bit；总传输量为 10N = 10,485,760 bit。开销相当于有效数据量的 25%，占总传输量的 20%。',en:'Each data byte requires ten transmitted bits, giving 2,097,152 overhead bits and 10,485,760 bits in total.',aliases:['起始','start','停止','stop','2097152','2,097,152','10485760','10,485,760','overhead']},
   {label:'从波特率换成比特率',text:'波特率是每秒符号数，比特率是每秒比特数。本题每符号 1 bit，且 K = 1000，所以两种比特率为 56,000 bit/s、3,000,000 bit/s。',en:'One bit per symbol and K = 1000 give bit rates of 56,000 bit/s and 3,000,000 bit/s.',aliases:['one bit per symbol','每符号1位','56000','56,000','3000000','3,000,000','1000','比特率']},
   {label:'总传输位数除以比特率',text:'t = Bₜ/R。56 Kbaud 时 t = 10,485,760/56,000 ≈ 187.25 s；3000 Kbaud 时 t = 10,485,760/3,000,000 ≈ 3.50 s。最后取近似值并注明秒。',en:'Using t = Bₜ/R gives approximately 187.25 s at 56 Kbaud and 3.50 s at 3000 Kbaud.',aliases:['t','187.25','187.2457','3.50','3.495','传输时间','transmission time']}
  ],
  trap:'起始位与停止位是每个字节都要加，不能整幅图只加两位；K = 1000 已由题目规定。baud 与 bit/s 仅因本题每符号 1 bit 才数值相同。',
  variants:['Include the start and stop bits for every byte of the given 1024 × 1024, 256-level image and determine both transmission times.','How many bits must actually be sent for the given image, and how long does transmission take at each stated baud rate?'],
  quiz:{prompt:'每个 8 位数据字节另加一个起始位和一个停止位，本题总传输位数如何计算？',options:['像素数 × 10','像素数 × 8，整幅图最后加 2','像素数 × 256','总位数直接等于波特率'],answer:0,explain:'256 灰度级对应每像素 8 位，即一个字节。每个字节都要发出 8 + 1 + 1 = 10 位，所以总位数为像素数乘以 10。'},
  cloze:{text:'包括每字节的起始位和停止位，1024 × 1024 图像共需传输 ___ bit。',answers:['10485760','10,485,760','10 485 760','1024*1024*10','1024×1024×10'],explain:'1024 × 1024 个数据字节，每字节传输 10 位，共 10,485,760 bit。'},
  example:'<p>256 = 2<sup>8</sup> → 每像素一个字节 → 有效数据量 1024 × 1024 × 8 = 8,388,608 bit → 开销 1024 × 1024 × 2 = 2,097,152 bit → 总传输量 10,485,760 bit。</p><p>t<sub>56</sub> = 10,485,760/56,000 = 187.245714… s ≈ <strong>187.25 s</strong>；t<sub>3000</sub> = 10,485,760/3,000,000 = 3.495253… s ≈ <strong>3.50 s</strong>。</p>'
 },
 {
  id:24,title:'Huffman 图像编码计算 · 教材 8.9',topic:'图像压缩',
  en:'Consider the given 4 × 8, 8-bit image. Its four rows are all [21, 21, 21, 95, 169, 243, 243, 243]. (a) Compute the entropy of the image. (b) Compress the image using Huffman coding. (c) Compute the compression achieved and the effectiveness of the Huffman coding.',
  zh:'给定一幅 4 × 8、8 位图像，四行均为 [21, 21, 21, 95, 169, 243, 243, 243]。(a) 求图像熵；(b) 进行 Huffman 编码；(c) 求压缩效果与 Huffman 编码效率。',
  problemHtml:'<div class="example"><strong>原题矩阵 · 教材 P646，8.9(a)(b)(c)</strong><p>图像尺寸为 4 × 8，每像素 8 bit：</p><pre> 21  21  21  95 169 243 243 243\n 21  21  21  95 169 243 243 243\n 21  21  21  95 169 243 243 243\n 21  21  21  95 169 243 243 243</pre><p>(a) Compute the entropy of the image.<br>(b) Compress the image using Huffman coding.<br>(c) Compute the compression achieved and the effectiveness of the Huffman coding.</p></div>',
  cues:[{en:'entropy of the image',zh:'计数、概率、熵'},{en:'Huffman coding',zh:'反复合并最小频次'},{en:'compression achieved and effectiveness',zh:'压缩比与编码效率分别算'}],
  intuition:'先数清四种灰度各出现几次，再给常见灰度分配短码、少见灰度分配长码。最后分别问压缩后有多少位，以及平均码长离熵有多近。',
  points:[
   {label:'统计灰度概率',text:'共有 32 个像素，21、95、169、243 分别出现 12、4、4、12 次；概率依次为 3/8、1/8、1/8、3/8，概率之和为 1。',en:'The four gray levels have counts 12, 4, 4 and 12, hence probabilities 3/8, 1/8, 1/8 and 3/8.',aliases:['32','12','4','3/8','1/8','0.375','0.125','概率','probabilities']},
   {label:'计算单像素熵',text:'H = −Σpᵢlog₂pᵢ = −2(3/8)log₂(3/8) − 2(1/8)log₂(1/8) ≈ 1.811278 bit/pixel。它是本题按灰度分布进行逐符号无损编码的平均码长下界。',en:'The entropy is H = −Σpᵢlog₂pᵢ ≈ 1.811278 bits per pixel.',aliases:['熵','entropy','log','1.811278','1.8113','1.811']},
   {label:'构造前缀码并编码原图',text:'合并频次：4 + 4 = 8，8 + 12 = 20，12 + 20 = 32。一种合法码为 243→0、21→10、95→110、169→111。每行编码为 101010110111000，共 15 bit；四行重复，共 60 bit。',en:'Merge the smallest counts successively. One valid prefix code is 243→0, 21→10, 95→110 and 169→111; the image requires 60 coded bits.',aliases:['Huffman','前缀','prefix','110','111','101010110111000','60']},
   {label:'平均码长与压缩比',text:'L̄ = (3/8)×2 + (1/8)×3 + (1/8)×3 + (3/8)×1 = 1.875 bit/pixel。原图 32×8 = 256 bit，编码后 32×1.875 = 60 bit，压缩比 CR = 256/60 = 64/15 ≈ 4.27:1。',en:'The average code length is 1.875 bits/pixel. The compression ratio is 256/60 ≈ 4.27:1.',aliases:['1.875','256','60','64/15','4.27','4.2667','compression ratio','平均码长']},
   {label:'编码效率与存储节省',text:'编码效率 η = H/L̄ ≈ 96.60%，相对编码冗余 1−η ≈ 3.40%。存储节省比例是 1−60/256 = 76.5625%，它与编码冗余含义不同。',en:'Coding efficiency is η = H/L̄ ≈ 96.60%; the storage reduction is instead 1−60/256 = 76.5625%.',aliases:['96.60','96.6','0.966','3.40','3.4','76.5625','H/L','编码效率','coding efficiency']},
   {label:'声明开销约定',text:'主答案按连续比特流计算，不计码表、文件头与字节补齐。若仅把 60 bit 码流补齐到整字节，则需 8 byte（64 bit），此时压缩比为 4:1，Huffman 码流本身仍为 60 bit。',en:'The calculation excludes codebook and header costs and byte padding; padding alone would round 60 bits up to 64 bits.',aliases:['不计','忽略','codebook','header','padding','码表','文件头','补齐']}
  ],
  trap:'原图每像素 8 位，即使只出现四种灰度，原始数据量仍为 32×8 = 256 bit。相同权值取舍和左右分支标号会导致不同的等价码表；应核对前缀性质和平均码长。',
  variants:['For the supplied image, derive its gray-level probabilities, construct a Huffman code, and calculate entropy, coded size, compression ratio and coding efficiency.','Apply Huffman coding to the given 4 × 8, 8-bit image and evaluate both the compression ratio and the ratio of entropy to average code length.'],
  quiz:{prompt:'本题的 effectiveness（编码效率）用哪个公式计算？',options:['熵 H ÷ 平均码长 L̄','原始位数 ÷ 压缩位数','1 − 压缩位数 ÷ 原始位数','灰度值之和 ÷ 像素数'],answer:0,explain:'η = H/L̄ 衡量平均码长距离熵下界有多近。原始位数/压缩位数是压缩比，1−压缩位数/原始位数是存储节省比例。'},
  cloze:{text:'32 个像素的 Huffman 码流共 60 bit，因此平均码长为 ___ bit/pixel。',answers:['1.875','15/8','60/32','1.875 bit/pixel','1.875 bits/pixel'],explain:'平均码长 = 总编码位数/符号数 = 60/32 = 1.875 bit/pixel，也等于各码长的概率加权平均。'},
  example:'<table><thead><tr><th>灰度</th><th>频次</th><th>概率</th><th>码字</th><th>码长</th></tr></thead><tbody><tr><td>21</td><td>12</td><td>3/8</td><td>10</td><td>2</td></tr><tr><td>95</td><td>4</td><td>1/8</td><td>110</td><td>3</td></tr><tr><td>169</td><td>4</td><td>1/8</td><td>111</td><td>3</td></tr><tr><td>243</td><td>12</td><td>3/8</td><td>0</td><td>1</td></tr></tbody></table><p>频次合并：4 + 4 = 8 → 8 + 12 = 20 → 12 + 20 = 32。每行编码 <code>10 | 10 | 10 | 110 | 111 | 0 | 0 | 0</code>，拼接为 <code>101010110111000</code>，重复四次共 60 bit；竖线不占码流位数。</p><p>H ≈ 1.811278，L̄ = 1.875 bit/pixel，CR ≈ 4.27:1，η ≈ 96.60%。码表、文件头和字节补齐未计入。</p>'
 }
];
const missingQuestions=[
 {id:11,title:'教材练习 3.23',topic:'教材待补',en:'Exercise 3.23 in the book.',zh:'教材第 3.23 题。',missing:'缺少教材版本、题干和图。当前不纳入完成率或自测。',blocked:true},
 {id:19,title:'教材练习 5.11',topic:'教材待补',en:'Exercise 5.11 (a), (b), (c), (d).',zh:'教材第 5.11 题的四个小问。',missing:'缺少教材版本和完整题干。当前不纳入完成率或自测。',blocked:true}
];
window.QUESTIONS=[...(window.CONTENT_A||[]),...(window.CONTENT_B||[]),...recoveredQuestions,...missingQuestions].sort((a,b)=>a.id-b.id);
window.MODEL_ANSWERS_RECOVERED={
 1:{
  status:'原题数据已补齐 · 教材 2.9 完整计算参考范本',
  english: `<p><strong>1. Find the image data.</strong> A pixel can take 256 gray levels. It needs log₂(256) = 8 bits, exactly one byte.</p>
<pre>N = 1024 × 1024 = 1,048,576 pixels
Image data = N × 8 = 8,388,608 bits = 1,048,576 bytes</pre>
<p><strong>2. Count the bits sent.</strong> The link sends one start bit and one stop bit with every data byte. Each byte therefore takes 1 + 8 + 1 = 10 bits on the link.</p>
<pre>Overhead = 2 × N = 2,097,152 bits
Total sent = 10 × N = 10,485,760 bits</pre>
<p>The overhead adds 2/8 = 25% to the image data. It makes up 2/10 = 20% of all the bits sent.</p>
<p><strong>3. Convert baud to bit/s.</strong> One baud means one symbol per second. Here each symbol carries one bit, and K = 1000. The two bit rates are 56,000 bit/s and 3,000,000 bit/s.</p>
<p><strong>4. Find the time.</strong> Divide all the bits sent, including the start and stop bits, by the bit rate.</p>
<pre>At 56 Kbaud:
t₁ = 10,485,760 / 56,000 = 187.245714… s ≈ 187.25 s

At 3000 Kbaud:
t₂ = 10,485,760 / 3,000,000 = 3.495253… s ≈ 3.50 s</pre>`,
  chinese: `<p><strong>1．算原图的数据量。</strong>一个像素有 256 种灰度可选，需要 log₂(256) = 8 bit，刚好一个字节。</p>
<pre>N = 1024 × 1024 = 1,048,576 个像素
原图数据量 = N × 8 = 8,388,608 bit = 1,048,576 字节</pre>
<p><strong>2．算实际发送的位数。</strong>每发一个数据字节，都要在前面加 1 个起始位，后面加 1 个停止位。发送一个字节实际要用 1 + 8 + 1 = 10 bit。</p>
<pre>传输开销 = 2 × N = 2,097,152 bit
总传输位数 = 10 × N = 10,485,760 bit</pre>
<p>与原图相比，每 8 位多发 2 位，开销相当于原图的 2/8 = 25%。在实际发出的 10 位里，开销占 2/10 = 20%。</p>
<p><strong>3．换算速率。</strong>1 波特表示每秒发送 1 个符号。本题每个符号携带 1 bit，并规定 K = 1000。两个比特率分别为 56,000 bit/s 和 3,000,000 bit/s。</p>
<p><strong>4．求传输时间。</strong>用含起始位和停止位的总传输位数除以比特率。</p>
<pre>56 Kbaud 时
t₁ = 10,485,760 / 56,000 = 187.245714… s ≈ 187.25 s

3000 Kbaud 时
t₂ = 10,485,760 / 3,000,000 = 3.495253… s ≈ 3.50 s</pre>`,
  scoring:['256 = 2⁸，每像素 8 bit；共 1,048,576 像素','有效数据量 8,388,608 bit，每字节另加起始、停止两位','开销 2,097,152 bit，总传输量 10,485,760 bit','由 one bit per symbol、K = 1000 得 56,000 与 3,000,000 bit/s','用 t = 总传输位数/比特率，求出约 187.25 s 与 3.50 s']
 },
 24:{
  status:'原题矩阵已补齐 · 教材 8.9(a)(b)(c) 完整计算参考范本',
  english: `<p><strong>(a) Find the entropy.</strong> The image has 4 × 8 = 32 pixels. Count the gray levels 21, 95, 169 and 243. They occur 12, 4, 4 and 12 times. Divide each count by 32 to get the probabilities 3/8, 1/8, 1/8 and 3/8.</p>
<pre>H = −Σ pᵢ log₂pᵢ
  = −2(3/8)log₂(3/8) − 2(1/8)log₂(1/8)
  ≈ 1.811278 bits/pixel</pre>
<p><strong>(b) Build the Huffman tree and encode the image.</strong> Merge the two smallest counts at each step.</p>
<pre>4 + 4 = 8
8 + 12 = 20
12 + 20 = 32</pre>
<p>Label the two branches at each split 0 and 1. Read from the root to each gray level to get its codeword. One valid code is shown below. No codeword is the prefix of another, so the decoder can tell where each one ends.</p>
<table><thead><tr><th>Gray level</th><th>Count</th><th>Probability</th><th>Code</th><th>Length</th></tr></thead><tbody><tr><td>21</td><td>12</td><td>3/8</td><td>10</td><td>2</td></tr><tr><td>95</td><td>4</td><td>1/8</td><td>110</td><td>3</td></tr><tr><td>169</td><td>4</td><td>1/8</td><td>111</td><td>3</td></tr><tr><td>243</td><td>12</td><td>3/8</td><td>0</td><td>1</td></tr></tbody></table>
<p>Replace each pixel in the first row with its codeword, in order.</p>
<pre>Codewords: 10 | 10 | 10 | 110 | 111 | 0 | 0 | 0
Bits sent: 101010110111000</pre>
<p>The bars just show the boundaries. Each row takes 15 bits. All four rows are the same, so the full stream has 4 × 15 = <strong>60 bits</strong>. A tie between counts or a swap of 0 and 1 can give a different Huffman code with the same average length.</p>
<p><strong>(c) Find the compression ratio and coding efficiency.</strong> Weight each code length by its probability.</p>
<pre>L̄ = (3/8)×2 + (1/8)×3 + (1/8)×3 + (3/8)×1
  = 1.875 bits/pixel
Original size = 32 × 8 = 256 bits
Coded size = 32 × 1.875 = 60 bits</pre>
<p>Compare the sizes to find the <strong>compression ratio</strong>. Compare the entropy with the average code length to find the <strong>coding efficiency</strong>.</p>
<pre>CR = 256/60 = 8/1.875 ≈ 4.27:1
η = H/L̄ = 1.811278…/1.875 ≈ 96.60%</pre>
<p>The relative coding redundancy is 1−η ≈ <strong>3.40%</strong>. This measures how far the average length is above the entropy, as a fraction of the average length. The space saved is 1−60/256 = <strong>76.5625%</strong> of the original size.</p>
<p>These results count the continuous bitstream alone. They exclude the codebook, file header and byte padding. If only whole-byte padding is added, 60 bits take 8 bytes (64 bits). The ratio then becomes 256/64 = 4:1.</p>`,
  chinese: `<p><strong>(a) 求图像熵。</strong>原图有 4 × 8 = 32 个像素。灰度 21、95、169、243 分别出现 12、4、4、12 次。各自除以 32，得到概率 3/8、1/8、1/8、3/8。</p>
<pre>H = −Σ pᵢ log₂pᵢ
  = −2(3/8)log₂(3/8) − 2(1/8)log₂(1/8)
  ≈ 1.811278 bit/pixel</pre>
<p><strong>(b) 建 Huffman 树，再写出码流。</strong>每一步都挑出当前频次最小的两个节点，把它们合并。</p>
<pre>4 + 4 = 8
8 + 12 = 20
12 + 20 = 32</pre>
<p>把每处分叉的两条边分别标上 0 和 1。从根走到某个灰度，沿途的数字连起来就是它的码字。下面是一种合法的前缀码。每个码字都不会成为另一个码字的开头，所以解码时能确定每个码字在哪里结束。</p>
<table><thead><tr><th>灰度</th><th>频次</th><th>概率</th><th>码字</th><th>码长</th></tr></thead><tbody><tr><td>21</td><td>12</td><td>3/8</td><td>10</td><td>2</td></tr><tr><td>95</td><td>4</td><td>1/8</td><td>110</td><td>3</td></tr><tr><td>169</td><td>4</td><td>1/8</td><td>111</td><td>3</td></tr><tr><td>243</td><td>12</td><td>3/8</td><td>0</td><td>1</td></tr></tbody></table>
<p>按原图第一行的像素顺序，将每个灰度替换成对应码字。</p>
<pre>逐个码字：10 | 10 | 10 | 110 | 111 | 0 | 0 | 0
实际码流：101010110111000</pre>
<p>竖线只标出码字边界。每行共 15 bit，四行完全相同，所以整幅图共用 4 × 15 = <strong>60 bit</strong>。频次相同时可以选择不同的节点，也可以互换左右分支的 0 和 1。这样得到的 Huffman 码表可能不同，最优平均码长相同。</p>
<p><strong>(c) 求压缩比和编码效率。</strong>先把每个码长乘以对应概率，再求和。</p>
<pre>L̄ = (3/8)×2 + (1/8)×3 + (1/8)×3 + (3/8)×1
  = 1.875 bit/pixel
原图大小 = 32 × 8 = 256 bit
编码大小 = 32 × 1.875 = 60 bit</pre>
<p>求<strong>压缩比</strong>，用原图大小除以编码大小。求<strong>编码效率</strong>，用图像熵除以平均码长。</p>
<pre>CR = 256/60 = 8/1.875 ≈ 4.27:1
η = H/L̄ = 1.811278…/1.875 ≈ 96.60%</pre>
<p>相对编码冗余为 1−η ≈ <strong>3.40%</strong>，表示平均码长中超出熵的部分占多大比例。存储节省比例为 1−60/256 = <strong>76.5625%</strong>，表示省下的位数占原图多大比例。</p>
<p>以上按连续码流计算，不计码表、文件头和字节补齐。如果只考虑补齐到整字节，60 bit 需要占 8 字节，即 64 bit。此时压缩比为 256/64 = 4:1。</p>`,
  scoring:['32 像素，频次 12、4、4、12 与概率 3/8、1/8、1/8、3/8','熵公式与 H ≈ 1.811278 bit/pixel','按最小频次合并，给出合法前缀码和原图编码；允许等价码表','平均码长 1.875 bit/pixel，编码总长 60 bit，原图 256 bit','压缩比约 4.27:1，编码效率约 96.60%','声明码表、文件头与补齐不计入；区分编码冗余与存储节省比例']
 }
};
