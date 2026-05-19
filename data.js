const SR_INTERVALS = [1,2,4,7,14,30];

const SUBTOPICS = [
  {
    id:'env', label:'🌿 Environment', short:'Environment', color:'gn',
    cards:[
      { col:'gn', tag:'Core Concept', tc:'tgn', title:'Environmental Impact of Digital Devices',
        body:`<p>The manufacture and disposal of digital devices significantly impacts the <span class="kwg">environment</span>. Energy is consumed at every stage — manufacturing, daily operation, and data storage.</p>
<p>Companies are working to cut energy use. For example, <span class="kwg">smart homes</span> automatically switch off lights and heating when rooms are unoccupied.</p>`,
        diagram:'lifecycle', info:'💡 Data centres alone consume around 1% of global electricity — equivalent to the entire aviation industry!' },
      { col:'pk', tag:'Key Problem', tc:'tpk', title:'E-Waste — A Growing Crisis',
        body:`<p><span class="kwp">Electronic waste (e-waste)</span> is one of the fastest-growing waste streams. Approximately <strong>50 million tonnes</strong> are produced every year — only a small fraction is properly recycled.</p>
<p>E-waste contains <span class="kwp">toxic substances</span> such as <span class="kwy">lead</span> and <span class="kwy">mercury</span>. When dumped in landfill these leach into soil and water, causing serious pollution and health hazards.</p>
<ul class="pk-bul"><li>Reduces chemical leakage and fire risks in landfill</li><li>Enables recovery of <span class="kwg">valuable metals</span> (gold, silver, copper)</li><li>Reduces the need for mining</li><li>Allows plastic cases to be reused</li></ul>
<p>The <span class="kw">WEEE Regulations</span> (Waste Electrical and Electronic Equipment) set legal targets for collection, recycling, and recovery of electronics.</p>`,
        diagram:'ewaste' },
      { col:'ye', tag:'Root Cause', tc:'tye', title:'The Short Replacement Cycle 📱',
        body:`<p>The average user replaces their mobile phone every <strong>3 years</strong>. This <span class="kwy">short replacement cycle</span> drives continuous device production and e-waste.</p>
<p>Manufacturers sometimes make repair deliberately difficult:</p>
<ul class="ye-bul"><li>Using <span class="kwy">embedded batteries</span> that cannot be replaced</li><li><span class="kwy">Gluing and soldering</span> components together</li><li>Inflating the price of spare parts</li><li>Only providing <span class="kwy">software updates</span> for a limited time</li></ul>`,
        diagram:'replacement' },
      { col:'gn', tag:'Solution', tc:'tgn', title:'Responsible Ownership & Reducing Energy 🌱',
        body:`<p><span class="kwg">Responsible ownership</span> can greatly reduce environmental impact:</p>
<ul class="gn-bul"><li>Keep devices for as long as possible</li><li>Buy <span class="kwg">pre-owned</span> devices instead of new</li><li>Donate unwanted devices to charities or recycling programmes</li><li>Use energy-efficient settings</li><li>Reduce unnecessary internet usage</li></ul>
<p><strong>Quick wins:</strong> dim screen, enable sleep mode, switch off Bluetooth/Wi-Fi/GPS when unused, close background apps, unplug peripherals.</p>
<p><strong>Positive tech uses:</strong> intelligent traffic control, smart lighting, environmental monitoring, home working reduces commuting emissions.</p>`,
        diagram:'pos_env' }
    ],
    cps:[
      {q:'Approximately how many tonnes of e-waste are produced globally each year?',opts:['5 million','25 million','50 million','200 million'],ans:2,exp:'Around 50 million tonnes of e-waste are produced each year, with only a fraction properly recycled.'},
      {q:'Which regulations set legal targets for electronics recycling in the UK?',opts:['Data Protection Act 2018','Computer Misuse Act 1990','WEEE Regulations','Copyright Designs and Patents Act'],ans:2,exp:'The WEEE (Waste Electrical and Electronic Equipment) Regulations set targets for collection, recycling, and recovery of computing technology.'},
      {q:'How often does the average user replace their mobile phone?',opts:['Every year','Every three years','Every five years','Every ten years'],ans:1,exp:'The average user replaces their mobile phone approximately every three years, which significantly contributes to the e-waste problem.'},
      {q:'Which of these is a positive environmental use of digital technology?',opts:['Buying a new phone annually','Mining cryptocurrency 24/7','Intelligent traffic control reducing fuel consumption','Streaming 4K video constantly'],ans:2,exp:'Intelligent traffic control systems reduce fuel consumption by optimising traffic flow — a genuine positive environmental use of technology.'}
    ]
  },
  {
    id:'data', label:'👤 Personal Data', short:'Personal Data', color:'',
    cards:[
      { col:'', tag:'Core Concept', tc:'tpu', title:'What Is Personal Data?',
        body:`<p><span class="kw">Personal data</span> is any information that can identify an individual:</p>
<ul><li>Name, address, phone number, email</li><li>Passport number, National Insurance number</li><li>Biometric data — fingerprints, facial scans, iris patterns</li><li>Ethnicity, religion, health conditions</li><li>Medical and financial records</li></ul>`,
        diagram:'personal_data' },
      { col:'cy', tag:'Key Term', tc:'tcy', title:'Digital Footprints 👣',
        body:`<p>A <span class="kwc">digital footprint</span> is the trail of personal data left behind when you use the internet:</p>
<ul><li>Websites visited (even incognito, your ISP can still see)</li><li>Emails sent and received</li><li>Posts and activity on social media</li><li>Financial data from online payments</li><li>Location data from mobile phones and apps</li></ul>
<p>Footprints can be <span class="kwc">active</span> (data you deliberately share) or <span class="kwc">passive</span> (data collected without your realising — cookies, browser fingerprinting).</p>`,
        diagram:'footprint' },
      { col:'ye', tag:'Benefits & Risks', tc:'tye', title:'Data Collection — Two Sides',
        body:`<p>Personal data collection has real benefits but also serious risks:</p>`,
        compare:{ pros:['Personalisation — tailored content and recommendations','Convenience — faster logins, saved preferences, delivery details','Better services — apps improve by learning from behaviour'], cons:['Privacy — often collected without full, informed consent','Security — data breaches expose millions of people','Discrimination — data analysis can lead to unfair treatment','Civil liberties — patterns may wrongly link individuals to crime'] } },
      { col:'pk', tag:'Ethics & Law', tc:'tpk', title:"Who Owns Your Data?",
        body:`<p>Ethical questions around <span class="kwp">data ownership</span> are often murky:</p>
<ul class="pk-bul"><li>When you post on social media, the platform often claims <span class="kwp">ownership rights</span> in their T&Cs</li><li>In the UK, <span class="kwp">medical records</span> belong to the NHS — patients only have the right to view them</li><li>Online retailers may sell <span class="kwp">aggregated purchase data</span> to third parties</li></ul>
<p>The <span class="kw">Data Protection Act 2018 (DPA)</span> sets strict rules on data collection and use. Anyone whose data is stored is a <span class="kw">data subject</span> with nine key rights.</p>` }
    ],
    cps:[
      {q:'What is a digital footprint?',opts:['A physical record of passwords','The trail of personal data left behind as you use the internet','A type of malware','Your device\'s serial number'],ans:1,exp:'A digital footprint is the trail of data you leave behind online — websites visited, emails sent, social media activity, location data, and financial transactions.'},
      {q:'Which of these is a PASSIVE contribution to your digital footprint?',opts:['Posting a photo on Instagram','Sending an email','Cookies collecting browsing data silently','Filling in an online form'],ans:2,exp:'Passive contributions happen without your direct input — cookies, browser fingerprinting, and IP logging all happen automatically as you browse.'},
      {q:'Under the DPA 2018, what is a "data subject"?',opts:['A government data official','Anyone whose personal data is stored or processed by an organisation','A type of database','The ICO director'],ans:1,exp:'A data subject is any individual whose personal data is stored or processed. They have nine rights under the DPA 2018.'},
      {q:'Who owns a patient\'s medical records in the UK?',opts:['The patient','The treating doctor','The hospital','The NHS'],ans:3,exp:'In the UK, medical records belong to the NHS, not the patient. Patients have the right to view their records but do not own them.'}
    ]
  },
  {
    id:'leg', label:'⚖️ Legislation', short:'Legislation', color:'cy',
    cards:[
      { col:'cy', tag:'Law', tc:'tcy', title:'Data Protection Act 2018 — The 7 Principles',
        body:`<p>The <span class="kwc">DPA 2018</span> requires organisations to follow seven key principles:</p>`,
        table:{ cls:'tbl-cy', heads:['Principle','What it means'], rows:[
          ['Lawfulness, fairness & transparency','Have a legitimate reason, be transparent, get consent'],
          ['Purpose limitation','Only use data for the purpose it was collected for'],
          ['Data minimisation','Collect only as much data as is necessary'],
          ['Accuracy','Keep data accurate and correct errors promptly'],
          ['Storage limitation','Don\'t keep data longer than needed'],
          ['Security','Protect data from loss, theft, or unauthorised access'],
          ['Accountability','Demonstrate that data protection measures are adequate'],
        ]}},
      { col:'cy', tag:'Rights', tc:'tcy', title:'Data Subject Rights (DPA 2018)',
        body:`<p>Under the DPA 2018, every <span class="kwc">data subject</span> has the right to:</p>
<ul><li>Be <span class="kwc">informed</span> about how their data is used</li><li><span class="kwc">Access</span> their personal data</li><li>Have <span class="kwc">inaccurate data corrected</span></li><li>Have data <span class="kwc">erased</span> (right to be forgotten)</li><li><span class="kwc">Object</span> to how data is processed</li><li><span class="kwc">Withdraw consent</span> at any time</li><li>Request changes to <span class="kwc">how</span> data is processed</li><li><span class="kwc">Data portability</span> — obtain and reuse their own data</li><li><span class="kwc">Complain</span> to the Information Commissioner's Office</li></ul>` },
      { col:'pk', tag:'Law', tc:'tpk', title:'Computer Misuse Act 1990',
        body:`<p>The <span class="kwp">Computer Misuse Act 1990</span> makes three computer crimes illegal:</p>`,
        table:{ cls:'tbl-pk', heads:['Offence','Description','Example'], rows:[
          ['Offence 1 — Unauthorised access','Accessing computer material without permission','Logging into someone\'s account without permission'],
          ['Offence 2 — Access with intent','Unauthorised access with intent to commit a further crime','Hacking to steal credit card details for fraud'],
          ['Offence 3 — Intent to impair','Unauthorised access intending to damage or impair systems','Planting a virus or installing malware'],
        ]},
        diagram:'cma' },
      { col:'ye', tag:'Law', tc:'tye', title:'Cookies & Privacy Regulations 🍪',
        body:`<p>A <span class="kwy">cookie</span> is a small text file stored on a user's computer when they visit a website. It remembers their device and preferences.</p>
<p>The <span class="kwy">Privacy and Electronic Communications Regulations 2003</span> govern cookies:</p>
<ul class="ye-bul"><li>Websites must <span class="kwy">display a clear notice</span> that cookies are used</li><li>They must obtain the user's <span class="kwy">consent</span></li><li>Users can <span class="kwy">opt out</span> of cookie-based data collection</li></ul>
<p>Benefits of accepting cookies: saves time, remembers preferences, delivery addresses, basket contents.</p>`,
        info:'💡 Cookies themselves are not harmful — but they can track your browsing across many websites, building a detailed profile of your interests.' }
    ],
    cps:[
      {q:'Which DPA 2018 principle says organisations should collect only as much data as necessary?',opts:['Purpose limitation','Storage limitation','Data minimisation','Accuracy'],ans:2,exp:'Data minimisation means organisations must collect only what is strictly necessary for their specified purpose — no more.'},
      {q:'Planting a virus on someone\'s computer without permission falls under which CMA offence?',opts:['Offence 1','Offence 2','Offence 3','It is not an offence'],ans:2,exp:'Offence 3 covers unauthorised access with intent to impair the running of a computer or damage/delete data — planting a virus is exactly this.'},
      {q:'What must a website do before setting cookies on your device?',opts:['Pay a registration fee','Display a notice and get your consent','Use session cookies only','Register cookies with the ICO'],ans:1,exp:'Under the Privacy and Electronic Communications Regulations 2003, websites must inform users that cookies are used and obtain their consent before setting them.'},
      {q:'Under the DPA 2018, which right allows a data subject to have their data deleted?',opts:['Right to access','Right to object','Right to erasure','Right to portability'],ans:2,exp:'The right to erasure (also called the "right to be forgotten") allows data subjects to request that their personal data is deleted by an organisation.'}
    ]
  },
  {
    id:'ai', label:'🤖 AI & Ethics', short:'AI & Ethics', color:'',
    cards:[
      { col:'', tag:'Core Concept', tc:'tpu', title:'Artificial Intelligence',
        body:`<p><span class="kw">Artificial Intelligence (AI)</span> refers to computer systems that can perform tasks typically requiring human intelligence — pattern recognition, decision-making, language understanding, problem-solving.</p>
<p><span class="kw">Machine learning</span> is a subset of AI where algorithms automatically improve by learning from data — they detect patterns without being explicitly programmed for every scenario.</p>
<p><span class="kw">Narrow AI</span> (weak AI) is designed for one specific task. It cannot transfer knowledge to other domains. If confronted with problems outside its "problem space", it fails.</p>`,
        diagram:'ai_venn' },
      { col:'gn', tag:'Examples', tc:'tgn', title:'Examples of Narrow AI in the Real World',
        body:`<p>All of these are examples of <span class="kwg">Narrow AI</span> — each excellent at one specific thing, useless at everything else:</p>
<ul class="gn-bul"><li><span class="kwg">Email spam filters</span> — classify emails as spam or genuine</li><li><span class="kwg">Social media monitoring</span> — detect hate speech or harmful content</li><li><span class="kwg">Facial & fingerprint recognition</span> — verify identity</li><li><span class="kwg">Content recommendations</span> — Netflix, YouTube, Spotify</li><li><span class="kwg">Voice recognition</span> — Siri, Alexa, Google Assistant</li><li><span class="kwg">Self-driving cars</span> — navigate using cameras and sensors</li><li><span class="kwg">Lethal autonomous weapons systems</span> — select and engage targets</li></ul>`,
        info:"💡 A voice assistant can hold a conversation but ask it to drive a car and it's helpless. That's the hard limit of Narrow AI." },
      { col:'pk', tag:'Ethics', tc:'tpk', title:'Algorithmic Bias ⚠️',
        body:`<p><span class="kwp">Algorithmic bias</span> occurs when an AI produces decisions that unfairly discriminate against people. Three main causes:</p>
<ul class="pk-bul"><li>The <span class="kwp">training dataset was biased</span> — if historical data reflects societal prejudice, the AI learns and reproduces it. E.g. a hiring AI trained on past decisions may discriminate against women.</li><li>A <span class="kwp">design flaw</span> in the algorithm — the algorithm amplifies rather than ignores bias patterns in data.</li><li>Developers <span class="kwp">unintentionally incorporating prejudices</span> — unconscious bias in design decisions.</li></ul>`,
        diagram:'bias' },
      { col:'ye', tag:'Ethics', tc:'tye', title:'The Black Box Problem & Responsibility',
        body:`<p>When AI goes wrong — a wrongful arrest, unfair loan rejection, medical misdiagnosis — it's very hard to assign blame. This is the <span class="kwy">"black-box" problem</span>: we can't see inside the decision-making process.</p>
<p>Responsibility may lie with:</p>
<ul class="ye-bul"><li>The <span class="kwy">algorithm creator</span> — if there was a logical error</li><li>The <span class="kwy">AI developer</span> — if biased or incomplete training data was used</li><li>The <span class="kwy">user</span> — if they overrode AI recommendations without proper judgement</li></ul>
<p><strong>Worked example:</strong> A voice assistant trained with machine learning can learn to distinguish the user's voice from background noise — improving without reprogramming.</p>` }
    ],
    cps:[
      {q:'What is machine learning?',opts:['A robot that teaches itself physically','A subset of AI where algorithms improve by learning from data','A programming language for AI','The process of manually coding every AI rule'],ans:1,exp:'Machine learning is a subset of AI where algorithms automatically improve by learning from data — detecting patterns without being explicitly programmed for every scenario.'},
      {q:'Which of these is an example of Narrow AI?',opts:['A computer that can think about anything','A general-purpose robotic assistant','An email spam filter','The entire internet'],ans:2,exp:'An email spam filter is Narrow AI — it is excellent at classifying emails but cannot apply that ability to anything else.'},
      {q:'What is the "black-box problem" in AI?',opts:['AI systems that consume too much power','AI stored in black server racks','The difficulty of understanding and assigning responsibility for AI decisions due to lack of transparency','AI that only works in the dark'],ans:2,exp:'The black-box nature of AI means we often cannot see inside the decision-making process, making it very difficult to assign blame when things go wrong.'},
      {q:'Which of these can cause algorithmic bias?',opts:['Using a large and diverse training dataset','Thoroughly testing before release','A biased training dataset reflecting historical prejudices','Having a diverse development team'],ans:2,exp:'Algorithmic bias can result from biased training data — if historical data reflects past discrimination, the AI learns and reproduces those biases.'}
    ]
  },
  {
    id:'ip', label:'📜 Intellectual Property', short:'IP & Copyright', color:'ye',
    cards:[
      { col:'ye', tag:'Core Concept', tc:'tye', title:'Intellectual Property — What & Why',
        body:`<p><span class="kwy">Intellectual property (IP)</span> refers to creations of the human mind that have commercial or cultural value — inventions, software, artworks, brand names. Protected by the <span class="kwy">Copyright, Designs and Patents Act 1988</span>.</p>`,
        diagram:'ip_types' },
      { col:'', tag:'Protection Type', tc:'tpu', title:'© Copyright',
        body:`<p><span class="kw">Copyright</span> automatically protects creative works the moment they are created — no registration needed. Covers songs, films, novels, software, images, and recordings.</p>
<ul><li>The <span class="kw">©</span> symbol indicates a copyrighted work</li><li>Protection is <span class="kw">automatic</span> — no fee or registration</li><li>Copyright holder controls copying, distributing, publishing, and selling</li><li>Others cannot use the work without permission</li><li>Lasts <span class="kw">70 years</span> after the creator's death</li><li>Protects the expression of an idea, not the idea itself</li></ul>` },
      { col:'cy', tag:'Protection Types', tc:'tcy', title:'⚙️ Patents & Trademarks',
        body:`<p><span class="kwc">Patents</span> protect new inventions — what they are and how they work.</p>
<ul><li>Must be <span class="kwc">applied for</span> — not automatic</li><li>Applicant must prove the invention is novel</li><li>Grants exclusive rights for <span class="kwc">20 years</span></li><li>Downside: companies spend billions fighting patent disputes instead of innovating</li></ul>
<p><span class="kwc">Trademarks</span> protect brand identity — logos, strap lines, colours, words.</p>
<ul><li>™ = registered; ® = not yet registered</li><li>Lasts <span class="kwc">10 years</span> (renewable)</li><li>Protects brands from imitation</li></ul>`,
        diagram:'ip_durations' },
      { col:'gn', tag:'Software Types', tc:'tgn', title:'Open-Source vs Proprietary Software',
        body:`<p>Two fundamentally different models of software distribution:</p>`,
        compare:{ labels:['✅ Open-Source','🔒 Proprietary'], pros:['Source code accessible to anyone — can be viewed, modified, redistributed','Usually free to use','Community of enthusiasts provides support','Can be installed on unlimited machines  E.g. Linux, LibreOffice, Firefox, Android'], cons:['Source code kept secret, protected by copyright','Usually paid — licensed per-user or per-machine','Dedicated professional development and support team','Thoroughly tested before release  E.g. Windows, macOS, Photoshop, iTunes'] } },
      { col:'ye', tag:'Licensing', tc:'tye', title:'Creative Commons & Licensing',
        body:`<p>The copyright holder can grant a <span class="kwy">licence</span> allowing others to use their work:</p>`,
        table:{ heads:['Licence Type','What it allows'], rows:[
          ['Creative Commons','Use, build upon, and distribute — with attribution to the original creator'],
          ['Attribution Non-Commercial','Use, adapt, and distribute for non-commercial purposes only, with credit'],
          ['Attribution Commercial','Same rights, but commercial use is also allowed'],
          ['Public Domain','No restriction — anyone can use for any purpose, no attribution needed'],
        ]},
        info:'💡 A software licence is a legally binding contract specifying exactly how you are permitted to use software.' }
    ],
    cps:[
      {q:'How long does copyright protection last after the creator\'s death?',opts:['10 years','20 years','50 years','70 years'],ans:3,exp:'Copyright lasts 70 years after the creator\'s death. After that, the work enters the public domain.'},
      {q:'What is the key difference between copyright and a patent?',opts:['Copyright must be applied for; a patent is automatic','A patent covers creative works; copyright covers inventions','Copyright is automatic; a patent must be applied for','They are identical'],ans:2,exp:'Copyright applies automatically the moment a work is created. A patent must be actively applied for to receive protection.'},
      {q:'Which of these is open-source software?',opts:['Adobe Photoshop','Microsoft Windows','Firefox','iTunes'],ans:2,exp:'Firefox is open-source — its source code is publicly available and can be modified and redistributed. The others are all proprietary.'},
      {q:'How long does trademark registration last?',opts:['5 years','10 years (renewable)','20 years','70 years'],ans:1,exp:'Trademark registration typically lasts 10 years and can be renewed indefinitely.'}
    ]
  },
  {
    id:'threats', label:'🔓 Cyber Threats', short:'Cyber Threats', color:'pk',
    cards:[
      { col:'pk', tag:'Core Concept', tc:'tpk', title:'Malware — Types & How They Work',
        body:`<p>A <span class="kwp">cyberattack</span> is a malicious attempt to gain unauthorised access to a digital system. <span class="kwp">Malware</span> is malicious software — the most common attack tool.</p>`,
        table:{ cls:'tbl-pk', heads:['Type','How it works','Impact'], rows:[
          ['🦠 Virus','Inserts into a host program; copies itself when the host runs; spreads via email/messaging','Corrupts or deletes data; spreads widely'],
          ['🐛 Worm','Moves independently across networks — no host needed','Infects entire networks extremely rapidly'],
          ['🐴 Trojan','Disguises itself as legitimate software; runs silently in background','Provides backdoor access; delivers ransomware'],
          ['💰 Ransomware','Encrypts all files on the victim\'s system','Victim must pay a ransom for the decryption key'],
          ['⌨️ Keylogger','Secretly records every keystroke the user makes','Steals passwords, credit card numbers'],
          ['🤖 Botnet/DDoS','Compromises thousands of devices into a zombie army; floods targets with traffic','Crashes websites and network services'],
        ]},
        diagram:'malware' },
      { col:'ye', tag:'Hacker Types', tc:'tye', title:'Black-Hat vs White-Hat Hackers',
        body:`<p>Not all hackers have malicious intent:</p>
<ul><li><span class="kwp">Black-hat hackers</span> are cybercriminals who break into systems illegally to steal data, cause damage, or extort victims. Their activities are illegal.</li><li><span class="kwg">White-hat hackers</span> (ethical hackers) are employed by organisations to find vulnerabilities before criminals do. Legal and authorised.</li></ul>`,
        info:'💡 Many companies run "bug bounty" programmes — Google, Microsoft, and Apple all pay white-hat hackers to find and report security flaws.' },
      { col:'', tag:'Technical', tc:'tpu', title:'Technical Vulnerabilities 🐛',
        body:`<p>A <span class="kw">technical vulnerability</span> is a hardware, software, or configuration flaw that attackers can exploit:</p>`,
        table:{ heads:['Vulnerability','Why it\'s dangerous'], rows:[
          ['Unpatched software','Hackers exploit known flaws. Zero-day vulnerabilities have no patch yet — extremely dangerous.'],
          ['Out-of-date anti-malware','Cannot detect new threats if the signature database isn\'t updated constantly.'],
          ['Open ports','Communication endpoints that can be scanned and exploited by attackers.'],
          ['Default admin passwords','Many devices ship with well-known default passwords hackers can easily find online.'],
        ]} },
      { col:'pk', tag:'Social Engineering', tc:'tpk', title:'Social Engineering Techniques 🗣️',
        body:`<p><span class="kwp">Social engineering</span> exploits human psychology rather than technical flaws to manipulate people into revealing information or installing malware:</p>`,
        table:{ cls:'tbl-pk', heads:['Technique','How it works'], rows:[
          ['Phishing 🎣','Deceptive emails pretending to be from trusted sources (banks, HMRC) — trick victims into clicking malicious links or entering credentials.'],
          ['Pretexting (Blagging) 🎭','The attacker invents a believable false scenario (e.g. "I\'m from IT support") to manipulate victims into revealing information.'],
          ['Baiting 🎁','Offering enticing free downloads bundled with malware, or leaving infected USB drives in public places.'],
          ['Quid pro quo 🤝','Offering a service (e.g. free tech support) in exchange for login credentials.'],
          ['Shoulder-surfing 👀','Physically observing someone to capture passwords or PINs — over the shoulder or with binoculars.'],
        ]},
        info:'💡 Phishing emails are identifiable by: generic greetings ("Dear Customer"), spelling/grammar errors, suspicious sender addresses, and urgent language.' }
    ],
    cps:[
      {q:'What makes a worm different from a virus?',opts:['Worms only affect mobile devices','A virus embeds in programs and needs a host to spread; a worm spreads independently across networks','They are identical','Worms only affect Windows computers'],ans:1,exp:'A virus inserts itself into a host program and spreads when that program is used. A worm spreads independently across networks without needing a host program.'},
      {q:'What does ransomware do?',opts:['Records your keystrokes to steal passwords','Slows down your device','Encrypts your files and demands payment for the decryption key','Redirects your browser to fake websites'],ans:2,exp:'Ransomware encrypts the victim\'s files. The attacker demands a ransom payment — often in cryptocurrency — in exchange for the decryption key.'},
      {q:'What is a zero-day vulnerability?',opts:['A flaw that only exists on the first day of use','A newly discovered software flaw with no patch available yet','A vulnerability fixed within 24 hours','A flaw in legacy operating systems only'],ans:1,exp:'A zero-day vulnerability is a newly discovered security flaw for which no patch yet exists — extremely dangerous because there is no available defence.'},
      {q:'Which social engineering technique involves leaving infected USB drives in public places?',opts:['Phishing','Shoulder-surfing','Pretexting','Baiting'],ans:3,exp:'Baiting involves leaving infected USB drives in public places hoping someone will plug them in, or offering free enticing downloads bundled with malware.'},
      {q:'What do white-hat hackers do?',opts:['Steal data for profit','Crash websites for fun','Help organisations find and fix security vulnerabilities legally','Build botnets for DDoS attacks'],ans:2,exp:'White-hat hackers are authorised by organisations to test their systems and find vulnerabilities before criminal hackers can exploit them.'}
    ]
  },
  {
    id:'protect', label:'🛡️ Protection', short:'Protection', color:'gn',
    cards:[
      { col:'gn', tag:'Defence', tc:'tgn', title:'Firewalls 🔥',
        body:`<p>A <span class="kwg">firewall</span> is the first line of defence for any networked device. It acts as a gatekeeper between the internal (trusted) network and the internet (untrusted).</p>
<p>Firewalls apply a set of <span class="kwg">rules</span> to all network traffic:</p>
<ul class="gn-bul"><li>Blocks unauthorised inbound connections</li><li>Prevents malicious software from sending data out</li><li>Can block downloads from known unsafe websites</li><li>Logs all traffic for security auditing</li></ul>`,
        diagram:'firewall' },
      { col:'', tag:'Defence', tc:'tpu', title:'Anti-Malware Software 🦠',
        body:`<p><span class="kw">Anti-malware software</span> detects, quarantines, and removes malware. It uses three approaches:</p>
<ul><li><strong>Signature-based detection:</strong> Compares files against a <span class="kw">database of known malware signatures</span>. Fast and reliable — but cannot detect brand-new threats until their signature is added.</li><li><strong>Heuristic analysis:</strong> Examines the <span class="kw">code structure</span> of suspicious files and compares it to known malware families. Can detect new variants.</li><li><strong>Dynamic heuristic analysis (sandboxing):</strong> Runs a suspicious file in an isolated <span class="kw">virtual machine (sandbox)</span> to observe its behaviour safely — without touching the real system.</li></ul>`,
        diagram:'antimalware' },
      { col:'cy', tag:'Defence', tc:'tcy', title:'Encryption 🔐',
        body:`<p><span class="kwc">Encryption</span> transforms data into an unreadable format — only someone with the correct key can decrypt and read it.</p>
<ul><li><span class="kwc">Symmetric encryption:</span> A single shared key is used for both encrypting and decrypting. Both sender and receiver must hold the same key. Fast, but securely sharing the key is a challenge.</li><li><span class="kwc">Asymmetric encryption:</span> Uses a key pair — a <strong>public key</strong> to encrypt (can be shared freely) and a <strong>private key</strong> to decrypt (kept secret by the recipient).</li></ul>`,
        diagram:'encryption' },
      { col:'gn', tag:'Policy', tc:'tgn', title:'Backup, Recovery & Acceptable Use Policy 💾',
        body:`<p><strong>Backup types:</strong></p>
<ul class="gn-bul"><li><span class="kwg">Full backup:</span> Complete copy of all data. Simple to restore but slow and storage-intensive.</li><li><span class="kwg">Incremental backup:</span> Only copies data changed since the last backup. Much faster and smaller — but restoration requires applying multiple backups in sequence.</li></ul>
<p><strong>Acceptable Use Policy (AUP):</strong> A document all users must sign, outlining permitted and prohibited use of an organisation's digital systems.</p>`,
        compare:{ labels:['✅ Appropriate Behaviour','❌ Inappropriate Behaviour'], pros:['Log off or lock screen when leaving a workstation','Use strong unique passwords and keep them private','Be cautious with email attachments and links','Report security incidents to IT immediately'], cons:['Install unauthorised software from the web','Plug in unknown USB devices','Share confidential information by phone or email without verification','Access personal social media on work systems without permission'] } }
    ],
    cps:[
      {q:'What is the primary role of a firewall?',opts:['To encrypt all outgoing data','To remove viruses from a device','To monitor and filter network traffic, blocking unauthorised connections','To automatically back up data'],ans:2,exp:'A firewall monitors both incoming and outgoing network traffic and applies rules to block unauthorised connections — acting as a barrier between the trusted internal network and the untrusted internet.'},
      {q:'What is "sandboxing" in anti-malware?',opts:['Storing encrypted data remotely','Running a suspicious file in an isolated virtual machine to observe its behaviour safely','Comparing signatures to a database','Blocking all external connections'],ans:1,exp:'Dynamic heuristic analysis (sandboxing) runs a suspicious file in an isolated virtual machine so its behaviour can be observed safely without affecting the real system.'},
      {q:'In asymmetric encryption, which key DECRYPTS data?',opts:['The public key','A shared symmetric key','The private key held secretly by the recipient','The session key'],ans:2,exp:'In asymmetric encryption the public key encrypts data, but only the corresponding private key — kept secret by the recipient — can decrypt it.'},
      {q:'What is the main advantage of incremental backup over full backup?',opts:['It backs up more data','It\'s simpler to restore','It only copies changed data — saving time and storage space','It automatically stores data in three locations'],ans:2,exp:'Incremental backups only copy data that has changed since the last backup, making them far faster and requiring much less storage than full backups.'},
      {q:'Which behaviour VIOLATES a typical Acceptable Use Policy?',opts:['Locking your screen when away','Using a strong unique password','Plugging in a USB drive found in the car park','Reporting a suspicious email to IT'],ans:2,exp:'Plugging in an unknown USB device is a clear AUP violation — it could introduce malware. Locking screens, strong passwords, and reporting suspicious emails are all correct AUP behaviours.'}
    ]
  }
];

const ALL_FLASHCARDS = [
  {t:'env', f:'E-waste', b:'Electronic waste — ~50 million tonnes produced annually, only a fraction recycled. Contains toxic lead and mercury. Governed by WEEE Regulations.'},
  {t:'env', f:'WEEE Regulations', b:'Waste Electrical and Electronic Equipment Regulations — set legal targets for the collection, recycling, and recovery of electronic devices in the UK and EU.'},
  {t:'env', f:'Short replacement cycle', b:'Average user replaces mobile every 3 years. Drives continuous device production and e-waste. Manufacturers discourage repair through gluing, embedding batteries, and limiting software updates.'},
  {t:'env', f:'Smart home', b:'Technology that automatically manages devices (lighting, heating) to reduce energy consumption — a positive environmental impact of digital technology.'},
  {t:'env', f:'Embedded battery problem', b:'Batteries built permanently into devices cannot be easily replaced. This discourages repair and encourages users to buy new devices, increasing e-waste.'},
  {t:'env', f:'Responsible ownership', b:'Keeping devices longer, buying pre-owned, donating unwanted devices, using energy-efficient settings — actions individuals can take to reduce environmental impact.'},
  {t:'env', f:'Ways to reduce device energy use', b:'Dim screen, enable sleep mode, switch off Bluetooth/Wi-Fi/GPS when not needed, close background apps, unplug unused peripherals.'},
  {t:'env', f:'Positive environmental impact of tech', b:'Smart traffic systems reduce fuel use; smart lighting saves electricity; environmental monitoring deters poaching; home working reduces commuting emissions.'},
  {t:'data', f:'Personal data', b:'Any information that identifies an individual — name, address, passport number, fingerprints, ethnicity, medical records, financial records.'},
  {t:'data', f:'Digital footprint', b:'The trail of personal data left behind as you use the internet — websites visited, emails sent, social media posts, location data, and financial transactions.'},
  {t:'data', f:'Active digital footprint', b:'Data you deliberately share online — posting on social media, filling in forms, sending emails.'},
  {t:'data', f:'Passive digital footprint', b:'Data collected without your direct input — cookies, browser fingerprinting, IP address logging, app location tracking.'},
  {t:'data', f:'Data subject', b:'Any individual whose personal data is stored or processed by an organisation. Data subjects have nine rights under the DPA 2018.'},
  {t:'data', f:'Data Protection Act 2018 (DPA)', b:'UK law setting strict rules about personal data collection, storage, and use. Seven principles. Nine data subject rights.'},
  {t:'data', f:'NHS medical records ownership', b:'In the UK, medical records belong to the NHS — patients only have the right to view them, not ownership.'},
  {t:'data', f:'Personalisation (data benefit)', b:'Using collected data to tailor content, ads, and recommendations based on user preferences and location.'},
  {t:'leg', f:'7 Principles of DPA 2018', b:'1. Lawfulness/fairness/transparency  2. Purpose limitation  3. Data minimisation  4. Accuracy  5. Storage limitation  6. Security  7. Accountability'},
  {t:'leg', f:'Data minimisation (DPA)', b:'Organisations must collect only as much personal data as is strictly necessary for the specified purpose — no more.'},
  {t:'leg', f:'Right to erasure (DPA)', b:'"Right to be forgotten" — a data subject can request their personal data is deleted by an organisation.'},
  {t:'leg', f:'Computer Misuse Act 1990', b:'UK law making three computer crimes illegal: 1. Unauthorised access  2. Access with intent to commit further offences  3. Access with intent to impair/damage systems.'},
  {t:'leg', f:'CMA Offence 1', b:'Unauthorised access to computer material — e.g. logging into someone\'s account without permission.'},
  {t:'leg', f:'CMA Offence 2', b:'Unauthorised access with intent to commit a further offence — e.g. hacking to steal credit card details for fraud.'},
  {t:'leg', f:'CMA Offence 3', b:'Unauthorised access with intent to impair or damage a computer/data — e.g. planting a virus or installing ransomware.'},
  {t:'leg', f:'Cookie', b:'A small text file stored on a user\'s computer when they visit a website; remembers the user\'s device and preferences.'},
  {t:'leg', f:'Privacy and Electronic Communications Regulations 2003', b:'Governs cookie use: websites must inform users, get consent, and allow opt-out of cookie-based data collection.'},
  {t:'ai', f:'Artificial Intelligence (AI)', b:'Computer systems that perform tasks typically requiring human intelligence — pattern recognition, decision-making, language understanding, problem-solving.'},
  {t:'ai', f:'Machine learning', b:'A subset of AI where algorithms improve automatically by learning from data — recognising patterns without being explicitly programmed for every scenario.'},
  {t:'ai', f:'Narrow AI (Weak AI)', b:'AI designed for a specific task or limited set of tasks. Cannot transfer knowledge to other domains. Fails outside its problem space.'},
  {t:'ai', f:'Examples of Narrow AI', b:'Spam filters, social media content moderation, facial recognition, content recommendations (Netflix/Spotify), voice assistants (Siri/Alexa), self-driving cars, autonomous weapons.'},
  {t:'ai', f:'Algorithmic bias', b:'When AI produces decisions that unfairly discriminate — caused by biased training data, design flaws, or developers\' unconscious prejudices.'},
  {t:'ai', f:'Black-box problem (AI)', b:'The opacity of many AI decision-making processes — it\'s often impossible to understand why a decision was made, making accountability very difficult.'},
  {t:'ai', f:'AI responsibility', b:'When AI fails, responsibility may lie with: the algorithm creator (logic error), the AI developer (biased training data), or the user (overriding AI without proper judgement).'},
  {t:'ip', f:'Intellectual property (IP)', b:'Creations of the human mind with commercial or cultural value. Protected by the Copyright, Designs and Patents Act 1988.'},
  {t:'ip', f:'Copyright', b:'Automatic protection for creative works (music, software, images, books). No registration needed. Lasts 70 years after creator\'s death. © symbol.'},
  {t:'ip', f:'Patent', b:'Must be applied for. Protects new inventions. Gives exclusive rights to make, use, and sell for 20 years.'},
  {t:'ip', f:'Trademark', b:'Protects brand identity — logos, strap lines, colours, words. ™ = registered; ® = not yet registered. Lasts 10 years, renewable.'},
  {t:'ip', f:'Creative Commons licence', b:'Allows others to use, build upon, and distribute a work — provided they credit the original creator.'},
  {t:'ip', f:'Public domain', b:'Works where copyright has expired or been waived — anyone can use them for any purpose without permission or attribution.'},
  {t:'ip', f:'Software licence', b:'A legally binding contract specifying exactly how software may be used — who, how many machines, and for what purposes.'},
  {t:'ip', f:'Open-source software', b:'Distributed with a licence allowing anyone to view, modify, and share the source code. Usually free. E.g. Linux, LibreOffice, Firefox, Android.'},
  {t:'ip', f:'Proprietary software', b:'Source code is kept secret and protected by copyright. Users cannot modify or share it. Usually paid. E.g. Windows, macOS, Photoshop, iTunes.'},
  {t:'threats', f:'Malware', b:'Malicious software — umbrella term for viruses, worms, trojans, ransomware, keyloggers, spyware, adware, and botnets.'},
  {t:'threats', f:'Virus', b:'Inserts into a host program; remains dormant until the host runs; copies itself and spreads to other programs via email and file sharing.'},
  {t:'threats', f:'Worm', b:'Spreads independently across networks without a host program. Can infect entire networks extremely rapidly.'},
  {t:'threats', f:'Trojan', b:'Malware disguised as legitimate software — tricks users into installing it. Provides backdoor access and often delivers ransomware.'},
  {t:'threats', f:'Ransomware', b:'Encrypts all files on the victim\'s system. Hackers demand a ransom payment for the decryption key.'},
  {t:'threats', f:'Keylogger', b:'Secretly records every keystroke — allows hackers to extract passwords, credit card numbers, and other sensitive data.'},
  {t:'threats', f:'Botnet / DDoS attack', b:'A botnet is a network of zombie devices; used in DDoS attacks to flood a target with traffic, causing it to crash.'},
  {t:'threats', f:'Black-hat hacker', b:'A cybercriminal who breaks into systems illegally for personal gain, to cause damage, or to extort victims.'},
  {t:'threats', f:'White-hat hacker', b:'An ethical security professional authorised by organisations to find vulnerabilities and help strengthen defences.'},
  {t:'threats', f:'Zero-day vulnerability', b:'A newly discovered software flaw with no patch yet available. Extremely dangerous — no defence exists until a patch is released.'},
  {t:'threats', f:'Phishing', b:'Deceptive emails pretending to come from trusted sources — trick victims into clicking malicious links or entering credentials.'},
  {t:'threats', f:'Pretexting (blagging)', b:'Inventing a believable false scenario (e.g. impersonating IT support) to manipulate victims into revealing confidential information.'},
  {t:'threats', f:'Baiting', b:'Offering enticing free downloads bundled with malware, or leaving infected USB drives in public hoping someone plugs them in.'},
  {t:'threats', f:'Quid pro quo', b:'Offering a service (e.g. free tech support) in exchange for login credentials or sensitive information.'},
  {t:'threats', f:'Shoulder-surfing', b:'Physically observing someone (over their shoulder or with binoculars) to capture passwords or PINs.'},
  {t:'threats', f:'Social engineering', b:'Manipulating people into revealing information or installing malware — exploiting human psychology rather than technical flaws.'},
  {t:'protect', f:'Firewall', b:'First line of defence — monitors and filters all network traffic using rules to block unauthorised connections between the internal network and the internet.'},
  {t:'protect', f:'Signature-based detection', b:'Anti-malware comparing files to a database of known malware signatures. Reliable but cannot detect brand-new threats.'},
  {t:'protect', f:'Heuristic analysis', b:'Examines suspicious code structure and compares to known malware families. Can detect new variants without a specific signature.'},
  {t:'protect', f:'Sandboxing (dynamic heuristic)', b:'Runs a suspicious file in an isolated virtual machine to observe its behaviour safely, without affecting the real system.'},
  {t:'protect', f:'Symmetric encryption', b:'Single shared key for both encrypting and decrypting. Fast and efficient but both parties must securely share the same key.'},
  {t:'protect', f:'Asymmetric encryption', b:'Public key encrypts (can be shared freely); private key decrypts (kept secret by recipient). Solves the key-sharing problem.'},
  {t:'protect', f:'Full backup', b:'Complete copy of all data. Simple to restore from a single backup but time-consuming and requires large storage.'},
  {t:'protect', f:'Incremental backup', b:'Only copies data changed since the last backup. Faster and smaller than full backups, but restoration requires applying multiple backups.'},
  {t:'protect', f:'Acceptable Use Policy (AUP)', b:'A document setting rules for using an organisation\'s digital systems. All users must sign it to acknowledge understanding and agreement.'},
];

const ALL_QUIZ = [
  {t:'env', q:'Approximately how many tonnes of e-waste are produced globally each year?', opts:['5 million','25 million','50 million','100 million'], a:2},
  {t:'env', q:'What does the acronym WEEE stand for?', opts:['Wireless Electrical Equipment Everywhere','Waste Electrical and Electronic Equipment','Web Electronic Encryption Equipment','Worldwide Electronics and Energy Efficiency'], a:1},
  {t:'env', q:'Which toxic substances found in e-waste are specifically mentioned?', opts:['Aluminium and copper','Lead and mercury','Gold and silver','Iron and nickel'], a:1},
  {t:'env', q:'Why do manufacturers sometimes make devices difficult to repair?', opts:['To meet safety regulations','To reduce manufacturing costs','To embed batteries and glue components, encouraging new purchases','To comply with WEEE targets'], a:2},
  {t:'env', q:'How often does the average user replace their mobile phone?', opts:['Every year','Every three years','Every five years','Every decade'], a:1},
  {t:'env', q:'Which of these is a POSITIVE environmental use of digital technology?', opts:['Buying a new phone annually','Mining cryptocurrency around the clock','Intelligent traffic control systems reducing fuel consumption','Streaming 4K video at all times'], a:2},
  {t:'data', q:'Which of these is personal data?', opts:['A fictional character\'s name','Today\'s weather forecast','A person\'s fingerprint','The population of London'], a:2},
  {t:'data', q:'What creates a passive digital footprint?', opts:['Posting a photo on social media','Sending an email','Cookies silently collecting browsing data','Filling in an online form'], a:2},
  {t:'data', q:'Under the DPA 2018, what is a "data subject"?', opts:['A government data official','Any individual whose personal data is stored or processed by an organisation','A type of encrypted database','The ICO director'], a:1},
  {t:'data', q:'Who owns a patient\'s medical records in the UK?', opts:['The patient','The treating doctor','The hospital','The NHS'], a:3},
  {t:'data', q:'What is a drawback of sharing personal data online?', opts:['More personalised content','Easier online transactions','Data breaches can expose your information to criminals','Faster loading websites'], a:2},
  {t:'leg', q:'How many principles are in the DPA 2018?', opts:['3','5','7','9'], a:2},
  {t:'leg', q:'Which DPA principle requires collecting only as much data as necessary?', opts:['Purpose limitation','Storage limitation','Accuracy','Data minimisation'], a:3},
  {t:'leg', q:'Which DPA right allows a data subject to have their data deleted?', opts:['Right to access','Right to erasure','Right to object','Right to portability'], a:1},
  {t:'leg', q:'Under the CMA 1990, logging into someone\'s account without permission is:', opts:['Offence 1','Offence 2','Offence 3','Legal if no damage is done'], a:0},
  {t:'leg', q:'Planting a virus on a computer falls under which CMA offence?', opts:['Offence 1','Offence 2','Offence 3','It is not covered by the CMA'], a:2},
  {t:'leg', q:'What must a website do before setting cookies?', opts:['Pay a registration fee','Display a notice and get user consent','Use only session cookies','Register with the ICO'], a:1},
  {t:'leg', q:'Which law governs cookie use on UK websites?', opts:['Computer Misuse Act 1990','Data Protection Act 2018','Privacy and Electronic Communications Regulations 2003','Copyright Designs and Patents Act 1988'], a:2},
  {t:'ai', q:'What is machine learning?', opts:['A physical robot that teaches itself','A programming language for AI','A subset of AI where algorithms improve by learning from data','The process of manually coding every rule'], a:2},
  {t:'ai', q:'Which of these is an example of Narrow AI?', opts:['A computer that can think about anything','A general-purpose robotic assistant','An email spam filter','The entire internet'], a:2},
  {t:'ai', q:'What makes Narrow AI different from General AI?', opts:['It\'s faster','It can only perform a specific task and cannot transfer knowledge to other domains','It\'s always wrong','It uses less electricity'], a:1},
  {t:'ai', q:'Which of these can cause algorithmic bias?', opts:['Using a large diverse training dataset','Thoroughly testing the system','A biased training dataset reflecting historical prejudices','Having a large development team'], a:2},
  {t:'ai', q:'What is the "black-box problem" in AI?', opts:['AI systems that use too much power','AI stored in black server racks','The difficulty of understanding and assigning responsibility for AI decisions','AI that only works at night'], a:2},
  {t:'ai', q:'A voice assistant improves at filtering background noise over time. This is an example of:', opts:['A technical vulnerability','A hardware upgrade','Machine learning improving performance through experience','Narrow AI exceeding its limits'], a:2},
  {t:'ip', q:'What does the © symbol indicate?', opts:['The work is patented','The work is in the public domain','The work is copyrighted','Creative Commons licence'], a:2},
  {t:'ip', q:'How long does copyright last after the creator\'s death?', opts:['10 years','20 years','50 years','70 years'], a:3},
  {t:'ip', q:'What is the key difference between copyright and a patent?', opts:['Copyright lasts longer','Copyright is automatic; a patent must be applied for','A patent covers creative works; copyright covers inventions','They are identical'], a:1},
  {t:'ip', q:'How long does a patent last?', opts:['10 years','20 years','50 years','70 years'], a:1},
  {t:'ip', q:'Which of these is open-source software?', opts:['Adobe Photoshop','Microsoft Windows','Firefox','iTunes'], a:2},
  {t:'ip', q:'What does a Creative Commons licence allow?', opts:['Complete transfer of ownership','Use, build upon, and distribute with attribution','Unlimited commercial use without attribution','Government ownership'], a:1},
  {t:'threats', q:'What distinguishes a worm from a virus?', opts:['Worms only affect mobile devices','A virus needs a host; a worm spreads independently across networks','They are identical','Worms are only spread by email'], a:1},
  {t:'threats', q:'What does ransomware do?', opts:['Records your keystrokes','Uses your device for crypto mining','Encrypts your files and demands payment for the decryption key','Redirects your browser'], a:2},
  {t:'threats', q:'What is a zero-day vulnerability?', opts:['A flaw in day-one devices only','A newly discovered software flaw with no patch yet','One fixed within 24 hours','A flaw in legacy systems only'], a:1},
  {t:'threats', q:'Which social engineering technique involves leaving infected USBs in public places?', opts:['Phishing','Shoulder-surfing','Pretexting','Baiting'], a:3},
  {t:'threats', q:'What do white-hat hackers do?', opts:['Steal data for profit','Crash websites for fun','Help organisations find and fix vulnerabilities — legally','Build botnets'], a:2},
  {t:'threats', q:'What is the primary goal of a DDoS attack?', opts:['Steal login credentials','Encrypt files for ransom','Flood a server with traffic causing it to crash','Record keystrokes'], a:2},
  {t:'threats', q:'A phishing email is MOST likely to contain:', opts:['Your correct full name','Perfect spelling and grammar','Generic greeting like "Dear Customer" and urgent language','A verified digital signature'], a:2},
  {t:'protect', q:'What does a firewall do?', opts:['Encrypts all data','Removes existing viruses','Monitors and filters network traffic, blocking unauthorised connections','Backs up data automatically'], a:2},
  {t:'protect', q:'What is the limitation of signature-based anti-malware detection?', opts:['It is too slow','It cannot match any known threat','It cannot detect brand-new malware whose signature is not yet in the database','It requires constant internet'], a:2},
  {t:'protect', q:'What is sandboxing in anti-malware?', opts:['Comparing signatures to a database','Running a suspicious file in an isolated virtual machine to observe its behaviour safely','Encrypting suspicious files','Blocking all external traffic'], a:1},
  {t:'protect', q:'In asymmetric encryption, which key DECRYPTS data?', opts:['The public key','A shared symmetric key','The private key held secretly by the recipient','The session key'], a:2},
  {t:'protect', q:'What is the main advantage of incremental backup over full backup?', opts:['It backs up more data','It\'s simpler to restore','Only copies changed data — saving time and storage space','Automatically stores data in three locations'], a:2},
  {t:'protect', q:'Which behaviour VIOLATES an Acceptable Use Policy?', opts:['Locking screen when away','Using a strong unique password','Plugging in a USB drive found in the car park','Reporting a suspicious email'], a:2},
];
