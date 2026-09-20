const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const Office = require("../models/Office");

// =====================================================
// NSFDC CHANNEL PARTNERS - 87 RECORDS
// NO PDF PARSING
// =====================================================

const offices = [

  {
    sourceId: 1,
    name: "Andhra Pradesh Scheduled Castes Cooperative Finance Corporation Ltd. (APSCCFC)",
    category: "SCA",
    state: "Andhra Pradesh",
    district: "Not specified in PDF",
    address: "SP River View Apartments, 3rd Floor, Tadepalli, Amaravathi – 522 501.",
    latitude: 15.83333,
    longitude: 79.75
  },

  {
    sourceId: 2,
    name: "Andhra Pradesh State Financial Corporation (APSFC)",
    category: "SCA",
    state: "Andhra Pradesh",
    district: "Not specified in PDF",
    address: "APSFC Building, Plot OS No.2, 2nd Cross, 3rd Road, Industrial Park, Vijayawada – 520 007.",
    latitude: 26.168563,
    longitude: 72.928951
  },

  {
    sourceId: 3,
    name: "Assam State Development Corporation for SCs Ltd. (ASCDC)",
    category: "SCA",
    state: "Assam",
    district: "Not specified in PDF",
    address: "Swahid Dilip Hozori Path, Sarumotoria, Dispur, Guwahati – 781 006.",
    latitude: 26.1300357,
    longitude: 91.7921724
  },

  {
    sourceId: 4,
    name: "Bihar State SCs Co-operative Development Corporation Ltd. (BSSCCDC)",
    category: "SCA",
    state: "Bihar",
    district: "Not specified in PDF",
    address: "RN-212, Officers Colony (Block-A), Bailey Road, Patna – 800 001.",
    latitude: 25.6425738,
    longitude: 85.1000255
  },

  {
    sourceId: 5,
    name: "Chandigarh SCs, BCs & Minorities Financial & Development Corporation Ltd. (CSCFDC)",
    category: "SCA",
    state: "Chandigarh",
    district: "Not specified in PDF",
    address: "3rd Floor, Additional Town Hall Building, Sector-17-C, Chandigarh-160 017.",
    latitude: 30.7334421,
    longitude: 76.7797143
  },

  {
    sourceId: 6,
    name: "Chhatisgarh State Antavasayee Sahkari Fin. & Dev.Corpn., (CGSCFDC)",
    category: "SCA",
    state: "Chhattisgarh",
    district: "Not specified in PDF",
    address: "4th Floor, Business Complex, Chhattisgarh Housing Board Bhawan, Naya Raipur, Chhattisgarh - 492101.",
    latitude: 21.217882675,
    longitude: 81.794163475
  },

  {
    sourceId: 7,
    name: "Dadra & Nagar Haveli, Daman & Diu SCs/STs/OBCs & Minorities Financial & Development Corporation (DNDSFDC)",
    category: "SCA",
    state: "Dadra & Nagar Haveli, Daman & Diu",
    district: "Not specified in PDF",
    address: "Ground Floor, Right Wing, New Collectorate Building, Near Electricity Department, Opp. 66, KVA Sub-Station, 66 KVA Road, Silvassa – 396 230.",
    latitude: 12.9720694,
    longitude: 77.6089097
  },

  {
    sourceId: 8,
    name: "Delhi SC/ST/OBC/Minorities & Handicapped Financial & Development Corporation (DSFDC)",
    category: "SCA",
    state: "Delhi",
    district: "Not specified in PDF",
    address: "Ambedkar Bhawan, Sector-16, (Opp. Sector-11), Rohini, Delhi – 110 085.",
    latitude: 28.64418,
    longitude: 77.204332
  },

  {
    sourceId: 9,
    name: "The Managing Director, Gujarat SCs Development Corporation (GSCDC)",
    category: "SCA",
    state: "Gujarat",
    district: "Not specified in PDF",
    address: "Dr Jivraj Mehta Bhawan, Block – 10, II Floor, Old Sachivalaya, Gandhinagar – 382 010.",
    latitude: 23.2232877,
    longitude: 72.6492267
  },

  {
    sourceId: 10,
    name: "Dr. Ambedkar Antyodaya Vikas Nigam (S.C.) (DAAVN)",
    category: "SCA",
    state: "Gujarat",
    district: "Not specified in PDF",
    address: "Karmayogi Bhavan, Block No. 2, D-2 Wing, 4th Floor, Sector -10/B, Gandhinagar, Gujarat.",
    latitude: 23.190508,
    longitude: 72.628449
  },

  {
    sourceId: 11,
    name: "Goa State SCs & OBCs Finance and Development Corporation Ltd. (GSCOBCDC)",
    category: "SCA",
    state: "Goa",
    district: "Not specified in PDF",
    address: "4th Floor, Patto Centre, Near K.T.C. Bus Stand, Panaji – 403 001.",
    latitude: 15.495703,
    longitude: 73.834506
  },

  {
    sourceId: 12,
    name: "Haryana SCs Fin. and Development Corporation Ltd., (HSCDC)",
    category: "SCA",
    state: "Haryana",
    district: "Not specified in PDF",
    address: "SCO-2427-28, Sector 22-C, Chandigarh – 160 022.",
    latitude: 30.4038406,
    longitude: 76.7869182
  },

  {
    sourceId: 13,
    name: "Himachal Pradesh SCs & STs Development Corporation (HPSCSTDC)",
    category: "SCA",
    state: "Himachal Pradesh",
    district: "Not specified in PDF",
    address: "Kalyan Bhawan, Near Ambusha Resort, Solan – 173212",
    latitude: 30.9077569,
    longitude: 77.1023645
  },

  {
    sourceId: 14,
    name: "Jharkhand State Scheduled Castes Cooperative Development Corporation (JSCDC)",
    category: "SCA",
    state: "Jharkhand",
    district: "Not specified in PDF",
    address: "Kalyan Complex, 3rd Floor, Balihar Road, Morabadi, Ranchi-834008.",
    latitude: 24.8059996,
    longitude: 76.6047585
  },

  {
    sourceId: 15,
    name: "J&K; SCs, STs & OBCs Dev. Corpn. Ltd. (JKSCSTBCDC)",
    category: "SCA",
    state: "Jammu & Kashmir",
    district: "Not specified in PDF",
    address: "Exchange Road, Near Red Cross Office, Srinagar – 190 001 (Office: May to October) & 135-A, Last Morh, Gandhi Nagar, JAMMU -180 004 (Office: November to April)",
    latitude: null,
    longitude: null
  },

  {
    sourceId: 16,
    name: "Dr B. R. Ambedkar Development Corporation Ltd. (DBRADC)",
    category: "SCA",
    state: "Karnataka",
    district: "Not specified in PDF",
    address: "9th & 10th Floor, Visheshwariah Mini Tower, Dr Ambedkar Veedhi, Bengaluru – 560 001.",
    latitude: 12.9789414,
    longitude: 77.5919685
  },

  {
    sourceId: 17,
    name: "Kerala State Development Corporation for SCs & STs Ltd., (KSDC)",
    category: "SCA",
    state: "Kerala",
    district: "Not specified in PDF",
    address: "Town Hall Road, Thrissur – 680 020.",
    latitude: 10.648203,
    longitude: 76.060948
  },

  {
    sourceId: 18,
    name: "Kerala State Women's Development Corporation (KSWDC)",
    category: "SCA",
    state: "Kerala",
    district: "Not specified in PDF",
    address: "1st Floor, Transport Bhavan, KSRTC Building, East Fort, Attakulangara-695023",
    latitude: 10.76367,
    longitude: 76.658751
  },

  {
    sourceId: 19,
    name: "MP State Cooperative SC Finance & Development Corporation (MPSCFDC)",
    category: "SCA",
    state: "Madhya Pradesh",
    district: "Not specified in PDF",
    address: "Rajiv Gandhi Bhawan, 35, Shyamala Hills, Bhopal – 462 011.",
    latitude: 23.23934,
    longitude: 77.38134
  },

  {
    sourceId: 20,
    name: "Mahatma Phule BCs Development Corporation Ltd. (MPBCDC)",
    category: "SCA",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "1-N, Supreme Shopping Centre, Gulmohar Cross Road No.9, J.V.P.D. Scheme, Juhu, Mumbai – 400 049.",
    latitude: 22.153529,
    longitude: 88.440966
  },

  {
    sourceId: 21,
    name: "Sahityaratna Lokshahir Annabhau Sathe Development Corporation Ltd.(SLASDC)",
    category: "SCA",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "New Administration Building No.2, 3rd Floor, Ramkrushna Chemburkar Marg, Chembur (E), Mumbai – 400 071.",
    latitude: 19.5,
    longitude: 76.0
  },

  {
    sourceId: 22,
    name: "Sant Rohidas Leather Industries & Charmakar Development Corporation (LIDCOM)",
    category: "SCA",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "Bombay Life Building, 5th Floor, 45, Veer Nariman Road, Mumbai – 400 001.",
    latitude: 18.9330812,
    longitude: 72.8304595
  },

  {
    sourceId: 23,
    name: "Manipur Tribal Development Corporation Ltd. (MTDC)",
    category: "SCA",
    state: "Manipur",
    district: "Not specified in PDF",
    address: "Lamphelpat, Imphal – 795 004.",
    latitude: 24.803616,
    longitude: 93.060806
  },

  {
    sourceId: 24,
    name: "Manipur SCs & STs Co-operative Dev. Bank (MSTCB)",
    category: "SCA",
    state: "Manipur",
    district: "Not specified in PDF",
    address: "Nambun Long, Stadium Road, Imphal East, MANIPUR-795001.",
    latitude: 19.0604,
    longitude: 83.82491
  },

  {
    sourceId: 25,
    name: "Meghalaya Cooperative Apex Bank Ltd. (MCAB)",
    category: "SCA",
    state: "Meghalaya",
    district: "Not specified in PDF",
    address: "M.G. Road, Kutchery, Shillong – 793 001.",
    latitude: 25.5723701,
    longitude: 91.8899327
  },

  {
    sourceId: 26,
    name: "Mizoram Urban Cooperative Development Bank Ltd. (MUCO Bank)",
    category: "SCA",
    state: "Mizoram",
    district: "Not specified in PDF",
    address: "Lawlsawmiliani Building (Top Floor), Zarkawt, Aizwal -796 001.",
    latitude: 23.543786,
    longitude: 92.884718
  },

  {
    sourceId: 27,
    name: "Mizoram Khadi & Village Industries & Board (MKVIB)",
    category: "SCA",
    state: "Mizoram",
    district: "Not specified in PDF",
    address: "“Zorun” Zarkawt, Aizwal -796 007.",
    latitude: 23.737302,
    longitude: 92.715717
  },

  {
    sourceId: 28,
    name: "Odisha SCs & STs Dev. Finance Co-op. Corpn. Ltd. (OSFDC)",
    category: "SCA",
    state: "Odisha",
    district: "Not specified in PDF",
    address: "Lewis Road, Bhubaneshwar – 751 014.",
    latitude: 20.214002,
    longitude: 85.853627
  },

  {
    sourceId: 29,
    name: "Puducherry Adi Dravidar Dev. Corpn. Ltd. (PADCO)",
    category: "SCA",
    state: "Puducherry",
    district: "Not specified in PDF",
    address: "III Floor, Directorate of Adi Dravidar Welfare Department, Thattanchavady, Puducherry - 605 009",
    latitude: 11.9461171,
    longitude: 79.8047242
  },

  {
    sourceId: 30,
    name: "Punjab Scheduled Castes Land Development & Finance Corporation (PSCLDFC)",
    category: "SCA",
    state: "Punjab",
    district: "Not specified in PDF",
    address: "SCO No.101-102-103, Sector 17-C, Chandigarh – 160 017.",
    latitude: 30.8876365,
    longitude: 75.937163
  },

  {
    sourceId: 31,
    name: "Rajasthan SCs & STs Fin. & Dev. Co-op. Corporation Ltd. (RSCDC)",
    category: "SCA",
    state: "Rajasthan",
    district: "Not specified in PDF",
    address: "III Floor, Central Block, Nehru Sahakar Bhawan, Bhawani Singh Marg, Jaipur–302005.",
    latitude: 17.0582463,
    longitude: 79.2685093
  },

  {
    sourceId: 32,
    name: "Sikkim Scheduled Castes Scheduled Tribes & Backward Classes Development Corporation (SSCSTBCDC)",
    category: "SCA",
    state: "Sikkim",
    district: "Not specified in PDF",
    address: "Bhanupath, Gangtok, Sikkim – 737 101.",
    latitude: 27.4437487,
    longitude: 88.5246664
  },

  {
    sourceId: 33,
    name: "Tamil Nadu Adi Dravidar Housing & Development Corporation Ltd. (TAHDCO)",
    category: "SCA",
    state: "Tamil Nadu",
    district: "Not specified in PDF",
    address: "No.31, Cenotaph Road, 2nd Lane, Teynamtet, Chennai -600 018.",
    latitude: 13.0256613,
    longitude: 80.1697502
  },

  {
    sourceId: 34,
    name: "Tripura Scheduled Castes Co-op. Devp. Corpn. Ltd. (TSCDC)",
    category: "SCA",
    state: "Tripura",
    district: "Not specified in PDF",
    address: "Krishna Nagar P.O. Lake Chomubani, Agartala – 799 001",
    latitude: 23.8312377,
    longitude: 91.2823821
  },

  {
    sourceId: 35,
    name: "Uttarakhand Bahu-udeshiya Vitta Evam Vikas Nigam (UBVEVN)",
    category: "SCA",
    state: "Uttarakhand",
    district: "Not specified in PDF",
    address: "Janjati Directorate, New Building, Bhagat Singh Clolony (Adhoiwala), Dehradun-248 001",
    latitude: 30.3255646,
    longitude: 78.0436813
  },

  {
    sourceId: 36,
    name: "UP Sahkari Gram Vikas Bank Ltd.",
    category: "SCA",
    state: "Uttar Pradesh",
    district: "Not specified in PDF",
    address: "10, Mall Avenue, Lucknow, Uttar Pradesh-226001.",
    latitude: 26.879641,
    longitude: 80.56982
  },

  {
    sourceId: 37,
    name: "UP Scheduled Castes Finance & Dev. Corpn. Ltd., (UPSCFDC)",
    category: "SCA",
    state: "Uttar Pradesh",
    district: "Not specified in PDF",
    address: "B-912, Sector-C, Mahanagar, Lucknow – 226 006.",
    latitude: 28.4316628,
    longitude: 77.2948196
  },

  {
    sourceId: 38,
    name: "West Bengal SCs, STs & OBC Development & Finance Corporation (WBSCSTOBCDFC)",
    category: "SCA",
    state: "West Bengal",
    district: "Not specified in PDF",
    address: "CF 217/A/1 Salt Lake Sector –I, (Mangolic Building) Kolkata – 700 064.",
    latitude: 24.0,
    longitude: 88.0
  },

  {
    sourceId: 39,
    name: "Indian Overseas Bank",
    category: "PSB",
    state: "Tamil Nadu",
    district: "Not specified in PDF",
    address: "Central Office, 763, Anna Salai, Chennai, Tamil Nadu – 600 002.",
    latitude: 10.329891,
    longitude: 76.938192
  },

  {
    sourceId: 40,
    name: "Bank of Baroda",
    category: "PSB",
    state: "Gujarat",
    district: "Not specified in PDF",
    address: "Baroda Bhavan, 7th Floor, R.C. Dutt Road, Vadodara – 390 007 (Gujarat)",
    latitude: 22.3101967,
    longitude: 73.1687372
  },

  {
    sourceId: 41,
    name: "Canara Bank",
    category: "PSB",
    state: "Karnataka",
    district: "Not specified in PDF",
    address: "Head Office, 112, J.C. Road, Bengaluru – 560 002.",
    latitude: 13.0461206,
    longitude: 77.5407073
  },

  {
    sourceId: 42,
    name: "Punjab National Bank",
    category: "PSB",
    state: "Delhi",
    district: "Not specified in PDF",
    address: "Plot No.-4, Sector 10, Dwarka, New Delhi – 110 075",
    latitude: 28.596283,
    longitude: 77.036366
  },

  {
    sourceId: 43,
    name: "Punjab & Sind Bank",
    category: "PSB",
    state: "Delhi",
    district: "Not specified in PDF",
    address: "Priority Sector Advance Department, 5th Floor, 21 Rajendra Place, New Delhi – 110 008",
    latitude: 28.6433841,
    longitude: 77.1777613
  },

  {
    sourceId: 44,
    name: "Union Bank of India",
    category: "PSB",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "Rural & Agri Business Department, Central Office Union Bank Bhavan Marg, Nariman Point, Mumbai – 400",
    latitude: 10.076215,
    longitude: 77.967333
  },

  {
    sourceId: 45,
    name: "Indian Bank",
    category: "PSB",
    state: "Tamil Nadu",
    district: "Not specified in PDF",
    address: "Corporate Office, No.254-260, Avvai Shanmugam Salai, Gowdi Mutt Road, Royapetta, Chennai – 600 014",
    latitude: 11.0,
    longitude: 78.33333
  },

  {
    sourceId: 46,
    name: "Bank of Maharashtra",
    category: "PSB",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "Head office ‘Lok mangal’, 1501, Shivajinagar, Pune-411005, Maharashtra",
    latitude: 19.5,
    longitude: 76.0
  },

  {
    sourceId: 47,
    name: "Bank of India",
    category: "PSB",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "Bandra Kurla Complex, Bandra (East), Mumbai- 400051",
    latitude: 19.0656664,
    longitude: 72.8739936
  },

  {
    sourceId: 48,
    name: "Central Bank Of India",
    category: "PSB",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "Chandermukhi Bldg., Nariman Point, Mumbai – 400 021",
    latitude: 18.92561356896552,
    longitude: 72.82366966034483
  },

  {
    sourceId: 49,
    name: "UCO Bank",
    category: "PSB",
    state: "West Bengal",
    district: "Not specified in PDF",
    address: "No 3&4, DD Block, Sector-1, Bidhannagar, Kolkata, West Bengal-700064",
    latitude: 23.269974,
    longitude: 87.815506
  },

  {
    sourceId: 50,
    name: "Bihar Gramin Bank",
    category: "RRB",
    state: "Bihar",
    district: "Not specified in PDF",
    address: "Shri Vishnu Commercial Complex, NH-30, New Bypass, Near BP Highway Services Petrol Pump, Asochak, Patna - 800016",
    latitude: 25.60633162962963,
    longitude: 85.16746941851852
  },

  {
    sourceId: 51,
    name: "Maharashtra Gramin Bank",
    category: "RRB",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "Plot No.35, Jeewan Shri Town Centre, CIDCO, Aurangabad, Maharashtra – 431 003.",
    latitude: null,
    longitude: null
  },

  {
    sourceId: 52,
    name: "Jharkhand Gramin Bank",
    category: "RRB",
    state: "Jharkhand",
    district: "Not specified in PDF",
    address: "Zila Parishad Market Complex, 3rd Floor, Kutchery Road, Ranchi- 834001, Jharkhand.",
    latitude: 23.432412,
    longitude: 85.406393
  },

  {
    sourceId: 53,
    name: "Haryana Gramin Bank",
    category: "RRB",
    state: "Haryana",
    district: "Not specified in PDF",
    address: "Near Bajrang Bhawan, Delhi Road, Rohtak, Haryana –124 001",
    latitude: 28.8845573,
    longitude: 76.6160762
  },

  {
    sourceId: 54,
    name: "Gujarat Gramin Bank",
    category: "RRB",
    state: "Gujarat",
    district: "Not specified in PDF",
    address: "Head Office, Sky Line Building, 2nd Floor, Near Shital Guest House, Bharuch - 392001, Gujarat.",
    latitude: 21.70529844431818,
    longitude: 72.99074520568182
  },

  {
    sourceId: 55,
    name: "Telangana Grameena Bank",
    category: "RRB",
    state: "Telangana",
    district: "Not specified in PDF",
    address: "H.No.2-1-520, 2nd Floor, Vijaya Sri Sai Celestia, Street No.9, Shankermut Road, Nallakunta, Hyderabad, Telangana – 500044.",
    latitude: 17.6687464,
    longitude: 77.5898867
  },

  {
    sourceId: 56,
    name: "Rajasthan Gramin Bank",
    category: "RRB",
    state: "Rajasthan",
    district: "Not specified in PDF",
    address: "Tulsi Tower, 9th B Road, Sardarpura, Jodhpur – 342003 (Rajasthan)",
    latitude: 26.2967719,
    longitude: 73.0351433
  },

  {
    sourceId: 57,
    name: "Uttar Pradesh Gramin Bank",
    category: "RRB",
    state: "Uttar Pradesh",
    district: "Not specified in PDF",
    address: "2nd & 3rd Floor, NBCC Commercial Complex, Vardan Khand, Gomti Nagar Extension, Lucknow–229001(Uttar Pradesh)",
    latitude: 26.879641,
    longitude: 80.56982
  },

  {
    sourceId: 58,
    name: "Kerala Grameena Bank",
    category: "RRB",
    state: "Kerala",
    district: "Not specified in PDF",
    address: "PB No.10, KGpB Towers, AK Road, Uphill, Malappuram,Kerala – 676505.",
    latitude: 11.0428925,
    longitude: 76.0807838
  },

  {
    sourceId: 59,
    name: "Uttarakhand Gramin Bank",
    category: "RRB",
    state: "Uttarakhand",
    district: "Not specified in PDF",
    address: "18-New Road, Dehradun, Uttarakhand.",
    latitude: 30.309678,
    longitude: 78.044356
  },

  {
    sourceId: 60,
    name: "Tripura Gramin Bank",
    category: "RRB",
    state: "Tripura",
    district: "Not specified in PDF",
    address: "H.O. Airport Road, PO Abhaynagar, Agartala, Tripura (W) Pin – 799 005.",
    latitude: 24.3200473,
    longitude: 74.4457841
  },

  {
    sourceId: 61,
    name: "Karnataka Grameena Bank",
    category: "RRB",
    state: "Karnataka",
    district: "Not specified in PDF",
    address: "Head Office, CA 20, Vijayanagar IInd Stage, Musure – 570017 (Karnataka)",
    latitude: 12.3372923,
    longitude: 76.6073668
  },

  {
    sourceId: 62,
    name: "Assam Gramin Bank",
    category: "RRB",
    state: "Assam",
    district: "Not specified in PDF",
    address: "HO, G.S. Road, Bhangagarh, Guwahati- 781 005.(Assam)",
    latitude: 26.167462,
    longitude: 91.7201512
  },

  {
    sourceId: 63,
    name: "Andhra Pradesh Grameena Bank",
    category: "RRB",
    state: "Andhra Pradesh",
    district: "Not specified in PDF",
    address: "4th Floor, Raghu Mansion, 4-1, Broadipet, Guntur -522 002 (Andhra Pradesh)",
    latitude: 18.9467143,
    longitude: 72.828779
  },

  {
    sourceId: 64,
    name: "Punjab Gramin Bank",
    category: "RRB",
    state: "Punjab",
    district: "Not specified in PDF",
    address: "HO Jalandhar Road, Kapurthala – 144 601. (Punjab)",
    latitude: 31.389196,
    longitude: 75.371054
  },

  {
    sourceId: 65,
    name: "Tamil Nadu Grama Bank",
    category: "RRB",
    state: "Tamil Nadu",
    district: "Not specified in PDF",
    address: "6, Yercaud Road, Hasthasmpatti, Salem – 636007 (Tamil Nadu)",
    latitude: 11.6734737,
    longitude: 78.1216221
  },

  {
    sourceId: 66,
    name: "Madhaya Pradesh Gramin Bank",
    category: "RRB",
    state: "Madhya Pradesh",
    district: "Not specified in PDF",
    address: "C21, Business Park, C21 Square opposite Hotel Radisson Blue, MR-10, Indore- 452010, Madhaya Pradesh",
    latitude: 22.7549361739726,
    longitude: 75.89494344931506
  },

  {
    sourceId: 67,
    name: "Himachal Pradesh Gramin Bank",
    category: "RRB",
    state: "Himachal Pradesh",
    district: "Not specified in PDF",
    address: "Jail Road (Panjethi), PO – Talyahar, Mandi 175001 (Himachal Pradesh)",
    latitude: 31.7084496,
    longitude: 76.9293782
  },

  {
    sourceId: 68,
    name: "Puducherry Grama Bank",
    category: "RRB",
    state: "Puducherry",
    district: "Not specified in PDF",
    address: "No.441, Mahatma Gandhi Road, Muthialpet, Puducherry – 605 003",
    latitude: 11.9496801,
    longitude: 79.8317937
  },

  {
    sourceId: 69,
    name: "West Bengal Gramin Bank",
    category: "RRB",
    state: "West Bengal",
    district: "Not specified in PDF",
    address: "Natabar Paul Road, Chatterjee Para More, Tikiapara, Howrah – 711101 (WB)",
    latitude: 22.568578,
    longitude: 88.231184
  },

  {
    sourceId: 70,
    name: "Chhattisgarh Gramin Bank",
    category: "RRB",
    state: "Chhattisgarh",
    district: "Not specified in PDF",
    address: "Corporate Office Raipur, Plot No.-47, Sector-24, Atal Nagar, Nava Raipur-492013",
    latitude: 20.26752,
    longitude: 72.97938
  },

  {
    sourceId: 71,
    name: "Manipur Rural Bank",
    category: "RRB",
    state: "Manipur",
    district: "Not specified in PDF",
    address: "Keishampat, Keisham Leikai, Imphal, Manipur 795001",
    latitude: 24.7991162,
    longitude: 93.9364419
  },

  {
    sourceId: 72,
    name: "Meghalaya Rural Bank",
    category: "RRB",
    state: "Meghalaya",
    district: "Not specified in PDF",
    address: "M.T.C Building, 2nd Floor, Police Bazar, Shillong-793001",
    latitude: 25.576727,
    longitude: 91.881437
  },

  {
    sourceId: 73,
    name: "J&K; Grameen Bank",
    category: "RRB",
    state: "Jammu & Kashmir",
    district: "Not specified in PDF",
    address: "Near Fruit Complex, Narwal, Jammu (J&K;) -180006",
    latitude: 32.7185614,
    longitude: 74.8580917
  },

  {
    sourceId: 74,
    name: "Odisha Grameen Bank",
    category: "RRB",
    state: "Odisha",
    district: "Not specified in PDF",
    address: "Bhubaneswar, 7R25-H75, Jagamara, Sunderpada Road, Gandamuda, Bhubaneswar -751030, Odisha",
    latitude: 20.2602964,
    longitude: 85.8394521
  },

  {
    sourceId: 75,
    name: "Mizoram Rural Bank",
    category: "RRB",
    state: "Mizoram",
    district: "Not specified in PDF",
    address: "MINECO, Khatla Aizawl - 796001.",
    latitude: 23.7173893,
    longitude: 92.6993894
  },

  {
    sourceId: 76,
    name: "Anik Financial Services Private Limited",
    category: "NBFC-MFI",
    state: "Maharashtra",
    district: "Not specified in PDF",
    address: "Regd. Office: ‘Sahyadri Building’, Behind Amitesh Hotel, Ambajogai Road, Sai Naka, Latur – 413 512",
    latitude: null,
    longitude: null
  },

  {
    sourceId: 77,
    name: "Grameen Development & Finance Private Limited",
    category: "NBFC-MFI",
    state: "Assam",
    district: "Not specified in PDF",
    address: "Dubjent, Kulshi Road, Chhaygaon, Kamrup, Assam Pin – 781 124.",
    latitude: 26.929151,
    longitude: 94.521155
  },

  {
    sourceId: 78,
    name: "ASA International Microfinance Ltd., Kolkata",
    category: "NBFC-MFI",
    state: "West Bengal",
    district: "Not specified in PDF",
    address: "Victoria Park, 4th Floor, GN-37/2, Sector-V, Salt Lake City, Kolkata – 700 091, West Bengal.",
    latitude: 22.57968,
    longitude: 88.435783
  },

  {
    sourceId: 79,
    name: "Midland Microfin Ltd., Ludhiana",
    category: "NBFC-MFI",
    state: "Punjab",
    district: "Not specified in PDF",
    address: "The Axis, Plot No.1, R.B.Badri Dass Colony, BMC Chowk, G.T.Road, Jalandhar – 144 001, Punjab.",
    latitude: 16.995711,
    longitude: 73.330198
  },

  {
    sourceId: 80,
    name: "Satin Creditcare Network Ltdl., Gurgaon",
    category: "NBFC-MFI",
    state: "Haryana",
    district: "Not specified in PDF",
    address: "Plot No.492, Udyog Vihar, Phase-III, Gurugram, Haryana – 122 016.",
    latitude: null,
    longitude: null
  },

  {
    sourceId: 81,
    name: "Pahal Financial Services Pvt. Ltd., Ahmedabad",
    category: "NBFC-MFI",
    state: "Gujarat",
    district: "Not specified in PDF",
    address: "7th Floor, Binori B Square-2, Opp. Hathising Ni Vadi, Ambli-Iscon Road, Ahmedabad – 380 054, Gujarat",
    latitude: 23.012116,
    longitude: 72.514732
  },

  {
    sourceId: 82,
    name: "Vector Finance PVT LTD",
    category: "NBFC-MFI",
    state: "Odisha",
    district: "Not specified in PDF",
    address: "RO-K7/110, Ground Floor, Klinga Vihar, P.S. Khandagiri, Bhubaneswar ODISHA-751029",
    latitude: 10.0737496,
    longitude: 76.3371317
  },

  {
    sourceId: 83,
    name: "North Eastern Development Finance Corporation Ltd. (NEDFi)",
    category: "Other Agency / SIDBI",
    state: "Assam",
    district: "Not specified in PDF",
    address: "Tea Auction Center, GS Rd, Sanket Vihar, Dispur, Opposite, Guwahati, Assam 781006",
    latitude: 26.1640667,
    longitude: 91.768087
  },

  {
    sourceId: 84,
    name: "Jharkhand Silk Textile & Handicraft Development Corporation Ltd. (JHARCRAFT)",
    category: "Other Agency / SIDBI",
    state: "Jharkhand",
    district: "Not specified in PDF",
    address: "Jharcraft, DIC Campus Ratu Road Ranchi Jharkhand 834001",
    latitude: 23.3961285,
    longitude: 85.2612107
  },

  {
    sourceId: 85,
    name: "Small Industries Development Bank of India (SIDBI)",
    category: "Other Agency / SIDBI",
    state: "Uttar Pradesh",
    district: "Not specified in PDF",
    address: "SIDBI Tower, 15, Ashok Marg, Lucknow - 226001, Uttar Pradesh",
    latitude: 26.84307,
    longitude: 80.9420951
  },

  {
    sourceId: 86,
    name: "Streenidhi, Telangana Cooperative Society",
    category: "Cooperative Society",
    state: "Telangana",
    district: "Not specified in PDF",
    address: "401 & 402, 4th Floor My Home Sarovar Plaza, Secretariat Road Ambedkar Colony, Saifabad, Hyderabad, Telangana 500004",
    latitude: 17.6687464,
    longitude: 77.5898867
  },

  {
    sourceId: 87,
    name: "Streenidhi AP Cooperative Society",
    category: "Cooperative Society",
    state: "Andhra Pradesh",
    district: "Not specified in PDF",
    address: "2nd Floor, NTR, Administrative Block, Rtc Complex, Vijayawada-520013, Andhra Pradesh",
    latitude: 14.762005,
    longitude: 78.874889
  }

];

// =====================================================
// SEED DATABASE
// =====================================================

const seedOffices = async () => {

  try {

    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log(
      `Loaded ${offices.length} office records.`
    );

    // Remove old office records
    await Office.deleteMany({});

    console.log(
      "Existing office records removed."
    );

    // Add default fields required by model
    const officeData = offices.map(office => ({
      ...office,
      phone: "",
      email: "",
      website: "",
      active: true
    }));

    const inserted =
      await Office.insertMany(officeData);

    console.log(
      `Inserted ${inserted.length} offices successfully.`
    );

    // Telangana count
    const telangana =
      inserted.filter(
        office =>
          office.state.toLowerCase() ===
          "telangana"
      );

    console.log(
      `Telangana offices: ${telangana.length}`
    );

    console.log(
      "Office seeding completed successfully."
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Office Seed Error:"
    );

    console.error(error);

    process.exit(1);
  }
};

seedOffices();