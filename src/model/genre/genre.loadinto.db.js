import { Genre } from "./genre.model.js";
import { Novel } from "../novels/novel.model.js";
import { Genre_Novel } from "../genre_novel/genre_novel.model.js";
import {
    scrapeMostPopularNovelsUrlData,
    scrapeGetAllGenres,
} from "../novels/scraping/scrape.novel.service.js";
import { Op } from "sequelize";
const data = [
    {
        id: 0,
        title: "Invincible",
        url_parameter: "invincible-novel",
        chapters: "3753",
        img_link: "https://freewebnovel.com/files/article/image/0/573/573s.jpg",
        link: "/invincible-novel.html",
        genre: [
            "Xuanhuan",
            "Action",
            "Seinen",
            "Drama",
            "Martial Arts",
            "Harem",
        ],
        author: ["Shen Jian", "神见"],
        description:
            "\n\n The strong are lonesome. Overcoming the loneliness pushes you to stand invincible at the top. Pro-disciple of the Shaolin Temple on Earth, Huang Xiaolong was reborn into a Martial Spirit world, carrying Hua Xia’s secret knowledge, the Body Metamorphose Scripture. In a Martial Spirit world, only those with Martial Spirit are able to train in battle qi and become a warrior. Huang Xiaolong – born with a heaven-defying rare Martial Spirit – was mistakenly taken for common variant Martial Spirit during the awakening ceremony conducted by the tribe and thus sidelined. However, Huang Xiaolong with his common “variant” Martial Spirit again, and again displayed unnatural talent, defeating geniuses, shocking the clan and the entire Martial Spirit World ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 1,
        title: "Emperor's Domination",
        url_parameter: "emperors-domination",
        chapters: "5296",
        img_link: "https://freewebnovel.com/files/article/image/0/447/447s.jpg",
        link: "/emperors-domination.html",
        genre: [
            "Xuanhuan",
            "Adventure",
            "Mature",
            "Mystery",
            "Harem",
            "Fantasy",
            "Action",
            "Martial Arts",
        ],
        author: ["厌笔萧生", "Yan Bi Xiao Sheng"],
        description:
            "\n\n A boy that was imprisoned for millions of years has regained a mortal body. He became a disciple of the declining Cleansing Incense Ancient Sect where its patriarch used to be his disciple. Now he will bring this sect back to its former glory. This is his journey to reach the apex and take revenge on those who had imprisoned him. This is his story of meeting old friends and making new companions. This is his path of traversing the Nine Worlds and becoming the next ruler of the Heavens. Several millennia have passed and the golden age of experts have passed. A master whose disciples once were the most exalted Immortals among the 9 worlds has all left him. With his mortal body, mortal physique and mortal life wheel… he shall sweep the 9 worlds and take what is rightfully his. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 2,
        title: "Nine Star Hegemon Body Arts",
        url_parameter: "nine-star-hegemon-body-arts",
        chapters: "4080",
        img_link: "https://freewebnovel.com/files/article/image/0/622/622s.jpg",
        link: "/nine-star-hegemon-body-arts.html",
        genre: [
            "Xuanhuan",
            "Tragedy",
            "Harem",
            "Action",
            "Martial Arts",
            "Adventure",
            "Seinen",
        ],
        author: ["平凡魔术师", "Ordinary Magician"],
        description:
            "\n\n Long Chen, a crippled youth who cannot cultivate, is constantly targeted and bullied by his fellow noble heirs. After a particularly vicious beating, he wakes up and realizes a Pill God’s soul has somehow merged with him, giving him some additional memories. Within those memories is the mysterious Nine Star Hegemon Body Art, a cultivation technique that even he can train in, but whose secrets and origin are still a mystery to him. Relying on his improved instincts as he finally begins to cultivate, he realizes a huge conspiracy is underfoot within the Phoenix Cry Empire, one involving his father, members of the imperial family, and even the Emperor himself. In order to solve the mysteries around him, he must rely on his new alchemy techniques and the powerful but baffling Nine Star Hegemon Body Art. Countless enemies block him as he attempts to climb to the peak of the cultivation world. Fate destined him to be only a chess piece, but he would not bow to the will of the Heavens. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 3,
        title: "The Mech Touch",
        url_parameter: "the-mech-touch",
        chapters: "5132",
        img_link: "https://freewebnovel.com/files/article/image/0/373/373s.jpg",
        link: "/the-mech-touch.html",
        genre: ["Sci-fi", "Fantasy"],
        author: ["Exlor"],
        description:
            "\n\n The Age of Mechs has arrived! Unfortunately, Ves Larkinson lacked thegenetic aptitude to become a famed mech pilot. Fighting against hisfate, he studied mech design in order to express his love for mechs in adifferent way and make his father proud. When Ves graduated from college, he returned to a new but emptyboutique. His dad had disappeared. Left with a small, newly founded mechworkshop that his father painstakingly built with a mountain of debt,Ves somehow needs to make ends meet with the bank breathing down hisneck. Then he found salvation from another legacy his father had left. ”Welcome to the Mech Designer System. Please design your new mech.“ ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 4,
        title: "Martial God Asura",
        url_parameter: "martial-god-asura-novel",
        chapters: "5581",
        img_link: "https://freewebnovel.com/files/article/image/0/356/356s.jpg",
        link: "/martial-god-asura-novel.html",
        genre: [
            "Action",
            "Fantasy",
            "Adventure",
            "Mature",
            "Xuanhuan",
            "Harem",
            "Drama",
            "Martial Arts",
        ],
        author: ["善良的蜜蜂", "Shan Liang De Mi Feng", "Kindhearted Bee"],
        description:
            "\n\n Regarding potential—even if you are not considered a genius, you can still learn Mysterious Techniques and martial skills. Anyone can be enlightened without a master. Regarding strength—despite having a myriad of artifacts, you may not defeat my army of World Spirits. Who am I? All of the world’s living perceives me as Asura, but I was ignorant to such a thing. I thus ascend to be the Martial God as Asura. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 5,
        title: "Reincarnation Of The Strongest Sword God",
        url_parameter: "reincarnation-of-the-strongest-sword-god",
        chapters: "3570",
        img_link: "https://freewebnovel.com/files/article/image/0/780/780s.jpg",
        link: "/reincarnation-of-the-strongest-sword-god.html",
        genre: [
            "Xianxia",
            "Martial Arts",
            "Adventure",
            "Action",
            "Xuanhuan",
            "Fantasy",
            "Reincarnation",
        ],
        author: ["天运老猫", "Lucky Old Cat"],
        description:
            "\n\n Starting over once more, he has entered this “living game” again in order to control his own fate. This time, he will not be controlled by others. Previously the Level 200 Sword King, he will rise to a higher peak in this life. Methods to earn money! Dungeon conquering strategies! Legendary Quests! Equipment drop locations! Undiscovered battle techniques! Even the secrets Beta Testers were unknowledgeable of, he knows of them all. Massive wars, life advancement, entering Godhood, sword reaching to the peak; a legend of a man becoming a Sword God has begun. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 6,
        title: "Mechanical God Emperor",
        url_parameter: "mechanical-god-emperor",
        chapters: "1572",
        img_link: "https://freewebnovel.com/files/article/image/0/626/626s.jpg",
        link: "/mechanical-god-emperor.html",
        genre: ["Sci-fi", "Xuanhuan", "Action", "Adventure", "Mecha", "Harem"],
        author: ["Assets Exploding", "资产暴增", "Zi Chan Bao Zeng"],
        description:
            "\n\n Yang Feng somehow transmigrated into a different world and received a legacy of an ‘ancient high tech’ family, which does not directly raise his power, but gives him the technology to build things which are way more advanced than the seemingly medieval world. But to build something you need resources and energy. To receive resources you need strength. To gain strength you need knowledge. To gain knowledge you... need strength? or a background? Or maybe a fully armed army of high tech robots who aren’t afraid of death? But is this legacy really for him to keep? ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 7,
        title: "Martial Peak",
        url_parameter: "martial-peak",
        chapters: "4906",
        img_link: "https://freewebnovel.com/files/article/image/0/374/374s.jpg",
        link: "/martial-peak.html",
        genre: [
            "Fantasy",
            "Martial Arts",
            "Mature",
            "Action",
            "Xuanhuan",
            "Harem",
        ],
        author: ["莫默", "Momo"],
        description:
            "\n\n The journey to the martial peak is a lonely, solitary and long one. In the face of adversity, you must survive and remain unyielding. Only then can you break through and continue on your journey to become the strongest. High Heaven Pavilion tests its disciples in the harshest ways to prepare them for this journey. One day the lowly sweeper Kai Yang managed to obtain a black book, setting him on the road to the peak of the martials world. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 8,
        title: "Necropolis Immortal",
        url_parameter: "necropolis-immortal",
        chapters: "2336",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1747/1747s.jpg",
        link: "/necropolis-immortal.html",
        genre: [
            "Xianxia",
            "Action",
            "Adventure",
            "Comedy",
            "Fantasy",
            "Mystery",
            "Supernatural",
        ],
        author: ["Immortal Amidst Snow In July"],
        description:
            "\n\nA great war raged between cultivators a hundred thousand years ago. Immortals fell by the tens of thousands, the path of cultivation itself was severed, and after the dust settled, tombs forested the world.A hundred thousand years after the last legend faded, Lu Yun, commandant of tomb raiders, descends upon the world. Armed with the Tome of Life and Death, he has some burning questions to answer.……“This isn’t how you raid a tomb!” Lu Yun smirked at the cultivators frantically scurrying about the ancient tomb. “Do you want me to teach you?”……But ah, can someone teach him how to cure his new body’s erectile dysfunction?Translator’s note: NECRO is a post-apocalyptic cultivation series with the world, civilization, and cultivation in tatters. Many hands pull many different strings from the shadows, and plots within plots seek to send heads spinning. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 9,
        title: "Prodigiously Amazing Weaponsmith",
        url_parameter: "prodigiously-amazing-weaponsmith",
        chapters: "4111",
        img_link: "https://freewebnovel.com/files/article/image/0/524/524s.jpg",
        link: "/prodigiously-amazing-weaponsmith.html",
        genre: ["Romance", "Josei", "Xianxia", "Adventure", "Action", "Drama"],
        author: ["Shui Qingqing", "水卿卿"],
        description:
            "\n\n When trash becomes a genius—one word: Fierce! Two words: Two-faced! Three words: Too heaven defying! She is the foremost and outstanding armament refining master. Passing through a dynasty, and became a publicly humiliated and bullied Third Young Miss. Ancient beasts, too outrageous? Obediently become a docile pet, or I’ll make you into soup! Ninth rank talent, rare talent in a thousand years? She was born with a godly constitution, crushing all geniuses! Peak level Profound Grade Armament, beyond priceless? Sorry to embarrass, but the bowl she uses to feed the cat is already at the God Grade..... she possessed a pair of eyes that could see through everything, yet she couldn’t see through—him! Merely exposing his demonic smile, Prince Mou lightly loosened his belt: “Can’t see through? Do not fret, you can slowly view when you return to the room. I’ll allow you to scrupulously inspect from head to toe.” ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 10,
        title: "One Birth Two Treasures: The Billionaire's Sweet Love",
        url_parameter: "one-birth-two-treasures-the-billionaires-sweet-love",
        chapters: "4731",
        img_link: "https://freewebnovel.com/files/article/image/0/431/431s.jpg",
        link: "/one-birth-two-treasures-the-billionaires-sweet-love.html",
        genre: ["Josei", "Drama", "Slice of Life", "Mature", "Romance"],
        author: ["花容月下", "Beauty Under The Moon"],
        description:
            "\n\n She became a surrogate mother in exchange for over a million yuan. As the esteemed CEO of the most powerful Empire in the capital, heholds absolute power, while she is just an adopted daughter to a familyof lowly status. She agreed to bear him his offspring, simply becauseher adoptive father’s business was failing. On the day of her delivery, the elder brother was born healthy, butthe younger one was stillborn. Having fulfilled the contract, shedisappeared from his sight along with the astronomical sum of money. Six years later, he is still that arrogant and high-profile CEO. Whenshe accidentally gets embroiled with him again – like a canary trappedin his cage, he closes in on her. “Woman, do you think you can escapefrom my clutches?!” However, he does not expect a little kid to interfere; the boypompously points his little finger at him and warns, “Mu Yazhe, you’dbetter leave her alone! She’s mine – this baby’s woman!” The man is alarmed, simply because the little kid’s facial features are identical to his… ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 11,
        title: "Reborn at Boot Camp: General, Don't Mess Around!",
        url_parameter: "reborn-at-boot-camp-general-dont-mess-around",
        chapters: "2894",
        img_link: "https://freewebnovel.com/files/article/image/0/489/489s.jpg",
        link: "/reborn-at-boot-camp-general-dont-mess-around.html",
        genre: [
            "Mystery",
            "Action",
            "Romance",
            "Drama",
            "Josei",
            "Reincarnation",
        ],
        author: ["直上青云"],
        description:
            "\n\n The newly rebirthed Ye Jian doesn’t need love! What she wants is to stand high up above other people and to look down on them in disdain! To those who have bullied me; who have disgraced me: I will return all your favors one by one. Ever since her rebirth, she used her reputation to eat, yet she became an extraordinary military soldier. He was born into wealth and could obviously use his family to eat, yet he had to use his own skills to become the youngest general. He took a fancy to her; she tried to avoid him. “You need to have a taste of romance.” He said. “Leave! What I need are bullets!” she angrily replied. The strong and strong fight; the strong and strong compete. This is the story of a strong military couple. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 12,
        title: "Quick Transmigration Female Lead: Male God, Never Stopping",
        url_parameter:
            "quick-transmigration-female-lead-male-god-never-stopping",
        chapters: "2784",
        img_link: "https://freewebnovel.com/files/article/image/0/367/367s.jpg",
        link: "/quick-transmigration-female-lead-male-god-never-stopping.html",
        genre: ["Romance", "School Life", "Comedy", "Reincarnation"],
        author: ["Origami Glazed Tile", "折纸琉璃"],
        description:
            "\n\n Luo Qing Chen is a wandering spirit that died thirty thousand years ago, roaming the Chaos Space In order to not turn into dust, she is bound by an ice cold system to travel through time and space to complete missions. Girls that pretend to be weak? Slap them without explaining. A silly cannon fodder? Helping them amass treasures. Meeting a real male god? All of them will pamper. System: Dear masters, what do I do if my host even dares bully the heavens? Waiting for an answer, it’s urgent! A certain male god: Change systems. System: ヽ〔?Д?〕丿 ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 13,
        title: "War Sovereign Soaring The Heavens",
        url_parameter: "war-sovereign-soaring-the-heavens-novel",
        chapters: "4595",
        img_link: "https://freewebnovel.com/files/article/image/0/387/387s.jpg",
        link: "/war-sovereign-soaring-the-heavens-novel.html",
        genre: [
            "Xianxia",
            "Martial Arts",
            "Xuanhuan",
            "Adventure",
            "Action",
            "Harem",
        ],
        author: ["风轻扬", "Feng Qingyang"],
        description:
            "\n\n Earth’s top weapon specialist’s soul crossed over to an alternate world, merged with Rebirth Martial Emperor’s memories, cultivating Nine Dragons War Sovereign Technique, sweeping through all opposition with invincible might! Able to refine medicine, capable of crafting weapons, and knows the art of inscription.... Being skilled in all professions is the way of kings! ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 14,
        title: "The Sovereign's Ascension",
        url_parameter: "the-sovereigns-ascension",
        chapters: "2034",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1694/1694s.jpg",
        link: "/the-sovereigns-ascension.html",
        genre: ["Xuanhuan", "Harem", "Adventure", "Action", "Fantasy"],
        author: ["Moon Like Fire", "月如火", "Yuè Rú Huǒ"],
        description:
            "\n\nAs a lawyer back on earth, Lin Yun had never lost a case. He owed his success to three things: two blessings he received at birth (a photographic memory and the ability to comprehend anything he studies) and an indomitable will he forged himself.While on a trip in Shandong province, he decided he would pay a visit to Mt. Tai. Just as he was cresting the peak, he felt a sharp pain in his chest and his vision went black.Upon waking up, he found himself in the world of Profound Amber occupying the body of a sword s*ave who had shared his name. The last thing he remembered before dying was the image of a sword piercing his chest.Through the memories his body retained the sword s*ave’s life, Lin Yun came to understand the brutality of this world. If he sought respect, he would have to earn it through strength. The weak found no compassion here.Refusing to leave his fate in the hands of others, Lin Yun set out to become a sovereign. No man or beast would stop him from achieving his destiny.With his sword in hand, he would overcome any obstacle. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 15,
        title: "God of Fishing",
        url_parameter: "god-of-fishing",
        chapters: "3417",
        img_link: "https://freewebnovel.com/files/article/image/0/383/383s.jpg",
        link: "/god-of-fishing.html",
        genre: ["Adventure", "Romance", "Action"],
        author: ["会狼叫的猪", "Pig That Can Howl Like A Wolf"],
        description:
            "\n\n In a world where humanity lives in suspended space, children undergo a fishing test when they come of age. Those with immaculate talents have the possibility of becoming great fishing masters. In the endless sea, every life is imbued with a sacred mission. There are fish that can fly, turtles that have absorbed the worldly essence, and whales that can devour the heaven and earth… There are also countless fishers. Fishing is an art. There is an ancient saying: If you can’t fish, you might as well be bait. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 16,
        title: "Mesmerizing Ghost Doctor",
        url_parameter: "mesmerizing-ghost-doctor",
        chapters: "3440",
        img_link: "https://freewebnovel.com/files/article/image/0/390/390s.jpg",
        link: "/mesmerizing-ghost-doctor.html",
        genre: [
            "Historical",
            "Comedy",
            "Fantasy",
            "Gender Bender",
            "Josei",
            "Xuanhuan",
            "Romance",
            "Adventure",
            "Action",
        ],
        author: ["凤炅", "Feng Jiong"],
        description:
            "\n\n She, a modern hidden ghost leader of an organization which gathered insane prodigies proficient in the various differing skill-sets. Highly skilled in medicine and poison, executes covert assassinations, viewed as insane and demonic in the eyes of people of the world. Killed in an accident, and reborn into the body of a disfigured young girl. What? Face disfigured, identity stolen? A return to the family dim and hopeless? Her identity can be given up, her family can be forgone, but as for the one who harmed her predecessor who inhabited this same body, if she didn’t at least make them scream in unimaginable agony and throw them into a state of wretchedness, how could she live up to her demonic reputation? Endless turmoil ensues and it’s a battle to dominate over all! See how she shook the world dressed in a suit of red, her sword up against the dominant powers that rocked the Heavens! Her name spread across the seas, shocking the earth! ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 17,
        title: "She Shocks The Whole World After Retirement",
        url_parameter: "she-shocks-the-whole-world-after-retirement",
        chapters: "1759",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1920/1920s.jpg",
        link: "/she-shocks-the-whole-world-after-retirement.html",
        genre: ["Josei", "Psychological", "Romance"],
        author: ["Emperor's Song", "帝歌"],
        description:
            "\n\nThe Assertive Female Lead VS The Super Strong Male LeadDuring a fire, the nation’s first love was disfigured, and her future was ruined! Her fiancé was disgusted by her face and broke off their engagement. Her adopted mother regarded her as the dirt on her shoes and chased her out of the family.She then wrote a letter to break off the engagement and another to cast off her family before she left!After Yu Huang left, the people in the entertainment industry said that after she left, she dyed her hair red, wore a veil, and went to nightclubs every day!But some thought that she went into detention centers.Just when everyone thought that Yu Huang abandoned herself to a life of degeneracy, was sent into jail, and could no longer create any sensational news, Yu Huang got herself trending again.Education Department of Prosperous City: We congratulate Eternal High School’s Yu Huang for becoming the top scorer with 7xx points! Congratulations on being admitted into Divine Academy! That is the academy that will only take in 10 geniuses every year!From then on, Yu Huang began her counterattack. She was reborn, and she shocked the whole world!Sheng Xiao was the greatest genius Divine Academy ever had, and his looks, too, were one of a kind. But he was an aloof person who did not fall for any woman’s flirting. Hence, he was known as the Aloof King of Hell.One day, someone saw him pin Yu Huang in a corner and grab her hand. He said, “You can predict the future. Tell me, are you the only person in my future?”Yu Huang looked into his future, and she shook her head. “No. You have a pair of cute, lively children in your future too.” ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 18,
        title: "Shadow Slave",
        url_parameter: "shadow-slave",
        chapters: "1090",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1991/1991s.jpg",
        link: "/shadow-slave.html",
        genre: ["Action", "Adventure", "Fantasy", "Romance"],
        author: ["Guiltythree"],
        description:
            "\n\nGrowing up in poverty, Sunny never expected anything good from life. However, even he did not anticipate being chosen by the Nightmare Spell and becoming one of the Awakened – an elite group of people gifted with supernatural powers. Transported into a ruined magical world, he found himself facing against terrible monsters – and other Awakened – in a deadly battle of survival. What's worse, the divine power he received happened to possess a small, but potentially fatal side effect… ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 19,
        title: "Beastmaster of the Ages",
        url_parameter: "beastmaster-of-the-ages-novel",
        chapters: "2276",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1324/1324s.jpg",
        link: "/beastmaster-of-the-ages-novel.html",
        genre: ["Xuanhuan", "Adventure", "Comedy", "Action", "Fantasy"],
        author: ["风青阳"],
        description:
            "\n\n Even in his dreams, Li Tianming can’t stop himself from laughing! Why? Because, his family pets are all the Primordial Chaos Beasts of myth! That teeny weeny little chick over there is actually the Aeternal Infernal Phoenix that eats suns! His black cat is the Genesis Chaos Thunderfiend that refines worlds with its lightning. The c*ckroach, well, it’s the Myriad Worlds Deathless Beast that possesses trillions of undying clones… Followed by his menagerie of pets, Li Tianming begins his ascension to become the number one beastmaster of the ages. He journeys across the many worlds, only one thing remaining constant. No one is ever ready for the likes of his pets! After all, who’s ever prepared to fight a chicken and its fellows… ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 20,
        title: "Godly Empress Doctor",
        url_parameter: "godly-empress-doctor",
        chapters: "3686",
        img_link: "https://freewebnovel.com/files/article/image/0/389/389s.jpg",
        link: "/godly-empress-doctor.html",
        genre: [
            "Romance",
            "Fantasy",
            "Josei",
            "Action",
            "Adventure",
            "Martial Arts",
            "Xuanhuan",
        ],
        author: ["苏小暖", "Su Xiao Nuan"],
        description:
            "\n\n She, a genius abandoned by her clan. He, a proud, pampered, two-faced imperial crown prince, a developing supreme ruler of the world. She, tricking him, disguised as a pig to eat a tiger, suppressing him, provoking him. Every time, after playing with him and stirring him up, she’d escape. No man could put up with this! He could only hunt her, pamper and indulge her, lure her into falling in love with him, who would have thought, the one to first fall in love would turn out to be him———- A young man who stood above the world, a young lady who dominated the landscape, evenly matched opponents, evenly matched romantic game of chase and tag. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 21,
        title: "My Vampire System",
        url_parameter: "my-vampire-system",
        chapters: "2412",
        img_link: "https://freewebnovel.com/files/article/image/0/647/647s.jpg",
        link: "/my-vampire-system.html",
        genre: ["Action", "Fantasy", "Mystery"],
        author: ["Jksmanga"],
        description:
            "\n\n The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward. Humans who had hidden in the shadows for hundreds of years, people with abilities. Some chose to share their knowledge to the rest of the world in hopes of winning the war, while others kept their abilities to themselves. Quinn had lost everything to the war, his home, his family and the only thing he had inherited was a crummy old book that he couldn’t even open. But when the book had finally opened, Quinn was granted a system and his whole life was turned around. He completed quest after quest and became more powerful, until one day the system gave him a quest he wasn’t sure he could complete. “It is time to feed!” “You must drink human blood within 24 hours” “Your HP will continue to decrease until the task has been completed” ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 22,
        title: "The Abandoned Husband Dominates",
        url_parameter: "the-abandoned-husband-dominates",
        chapters: "1452",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1581/1581s.jpg",
        link: "/the-abandoned-husband-dominates.html",
        genre: ["Fantasy"],
        author: ["I Have Something To Say"],
        description:
            "\n\n After three years of being married to an unfaithful wife, the multi-billionaire is chased out of his home! After the divorce... His unfaithful ex-wife comes begging for forgiveness while she says, “I was wrong, please give me another chance!” Meanwhile, his former mother-in-law pleads, “Please be my son-in-law, I’ll do your laundry, prepare your meals, and serve you well!” “It’s too late to regret...” ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 23,
        title: "Infinite Mana In The Apocalypse",
        url_parameter: "infinite-mana-in-the-apocalypse",
        chapters: "2403",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1303/1303s.jpg",
        link: "/infinite-mana-in-the-apocalypse.html",
        genre: ["Adventure", "Fantasy", "Game", "Action"],
        author: ["Adui"],
        description:
            "\n\n Blessed with unlimited mana, Noah travels the worlds and sees rampant corruption and injustice. Have you seen countless icebergs fall asunder? Have you watched a dragon despair? Follow one man as he overturns the order of the worlds... Author’ note: This is a story of fantasy and fiction, events or names used have no relation to the real world. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 24,
        title: "Remarried Empress",
        url_parameter: "remarried-empress",
        chapters: "471",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1249/1249s.jpg",
        link: "/remarried-empress.html",
        genre: ["Josei", "Fantasy", "Romance", "Historical", "Drama"],
        author: ["알파타르트"],
        description:
            "\n\n Navier was the perfect empress, however, the Emperor wanted a wife, not a colleague. And so, the Emperor abandoned Empress Navier and placed a slave girl beside him. That was fine, until Navier heard the Emperor promise the slave girl the Empress’ position. After much agonizing, Navier decided she would remarry the emperor of the neighboring country. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 25,
        title: "Divine Emperor of Death",
        url_parameter: "divine-emperor-of-death",
        chapters: "3086",
        img_link: "https://freewebnovel.com/files/article/image/0/466/466s.jpg",
        link: "/divine-emperor-of-death.html",
        genre: ["Fantasy", "Adventure", "Comedy", "Romance", "Harem", "Action"],
        author: ["Stardust_breaker"],
        description:
            "\n\n TianLong was born an orphan. He led his life in misery while out ofnowhere, he chanced upon a Death Note, killing his only enemy who wasthe cause for his misery. After a series of planning and action, hemanaged to cross worlds together with his Death Note. Hehas no attachments regarding Earth. He has no grand sense of justice,but just follows his heart and does whatever he thinks is right. JoinTian Long in his journey to become the Divine Emperor of Death in theCultivation World. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 26,
        title: "Chaotic Sword God",
        url_parameter: "chaotic-sword-god",
        chapters: "3554",
        img_link: "https://freewebnovel.com/files/article/image/0/361/361s.jpg",
        link: "/chaotic-sword-god.html",
        genre: [
            "Fantasy",
            "Action",
            "Xuanhuan",
            "Adventure",
            "Martial Arts",
            "Harem",
            "Tragedy",
            "Mature",
        ],
        author: ["Xin Xing Xiao Yao"],
        description:
            "\n\n Jian Chen, the publicly recognized number one expert of the Jianghu. His skill with the sword went beyond perfection and was undefeatable in battle, After a battle with the exceptional expert Dugu Qiubai who had gone missing over a hundred years ago, Jian Chen succumbed to his injuries and died. After death, Jian Chen’s spirit was transmigrated into a completely foreign world. Following an extremely fast growth, his enemies piled up one after another before becoming gravely injured once more. On the gates of death, his spirit had mutated, and from that moment henceforth, he would tread on a completely different path of the art of the sword to become the sword god of his generation. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 27,
        title: "I Was Caught up in a Hero Summoning, but That World Is at Peace",
        url_parameter:
            "i-was-caught-up-in-a-hero-summoning-but-that-world-is-at-peace",
        chapters: "1609",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1436/1436s.jpg",
        link: "/i-was-caught-up-in-a-hero-summoning-but-that-world-is-at-peace.html",
        genre: ["Comedy", "Fantasy", "Harem", "Romance", "Slice of Life"],
        author: ["Toudai", "灯台"],
        description:
            "\n\n Suddenly appearing in a different world, it looks like I got caught up in a Hero Summoning. And of course, I’m not the Hero, but it’s another guy……and while being very cautious and scared of the cliche of the cliche-like development, I was thrown into the maelstrom of war……or not. The Demon Lord? It was defeated a thousand years ago. Hero? He’s just the main actor in a festival. Nobles? They’re kindly taking care of us. The Demon Race? They have good relationships with Humans. Wars? It’s already 800 years since the last one. Monsters? The Guild and Order of Knight are taking care of them. Return to Earth? It is eventually No-Risk. What I’m planning after being caught up into this? I’m gonna enjoy the life in a different world as much as I want to, go on a cultural exchange and sightseeing, and after experiencing the festival that is only held once every ten years……I shall go home safely. The other world was――at Peace. A kind world where the three races, the Spirit World’s Magical Races, the Celestial World’s Divine Races, the Mortal World’s Human Races, they are kind neighbors to each other, with everyone living a peaceful and fulfilling life. But although I wished to peacefully spend a year before my return, for some reason, the heavyweights of this world keeps gathering around me, and…… ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 28,
        title: "Fey Evolution Merchant",
        url_parameter: "fey-evolution-merchant",
        chapters: "2411",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1251/1251s.jpg",
        link: "/fey-evolution-merchant.html",
        genre: ["Action", "Adventure", "Fantasy"],
        author: ["Amber Button"],
        description:
            "\n\n A century after the Spirit Qi Awakening, the world enters a new era. Humans are able to absorb the world’s awakened spirit qi, allowing them to tread on a new path—spirit qi occupations! Simultaneously, the plants and animals on the planet are also evolving toward their ancestry line or developing spiritual mutations. Lin Yuan realizes that he can assist feys in evolving limitlessly and constantly purify their bloodlines. He starts off with a small fey evolution store on the Star Web and rises up from there. Lin Yuan: “There is no problem that I cannot solve to deliver the goods. If there is a problem, it is because the goods are better than expectations!” This is a story purely about pets! ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 29,
        title: "Supreme Magus",
        url_parameter: "supreme-magus-novel",
        chapters: "2640",
        img_link: "https://freewebnovel.com/files/article/image/0/871/871s.jpg",
        link: "/supreme-magus-novel.html",
        genre: ["Fantasy", "Action"],
        author: ["Legion20"],
        description:
            "\n\n DerekMcCoy was a man that since from young age had to face many adversities. Often forced to settle with surviving rather tha living, had finallyfound his place in the world, until everything was taken from him onelast time. After losing his life to achieve revenge, he reincarnatesuntil he finds a world worth living for, a world filled with magic andmosters. Follow him along his journey, from grieving brother to aliensoldier. From infant to Supreme Magus. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 30,
        title: "Legend of Swordsman",
        url_parameter: "legend-of-swordsman",
        chapters: "4836",
        img_link: "https://freewebnovel.com/files/article/image/0/418/418s.jpg",
        link: "/legend-of-swordsman.html",
        genre: ["Martial Arts", "Xuanhuan", "Adventure", "Action"],
        author: ["Mr. Money", "打死都要钱"],
        description:
            "\n\n Jian Wushuang was reborn in adversity. In order to get his revenge, he began to cultivate Heavenly Creation Skill. With the help of the Heaven defying cultivation method, Jian Wushuang gradually grew into a peerless genius from an ordinary practitioner. With a sword in hand, no one is his match. Using his extraordinary Sword Principle, he killed all his opponents and eventually became number one Sword Master from time immemorial. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 31,
        title: "Madam's Identities Shocks the Entire City Again",
        url_parameter: "madams-identities-shocks-the-entire-city-again",
        chapters: "2138",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1388/1388s.jpg",
        link: "/madams-identities-shocks-the-entire-city-again.html",
        genre: ["Romance", "School Life"],
        author: ["Brother Ling"],
        description:
            "\n\n Qiao Nian lived in the Qiao family’s house for 18 years before her biological parents found her. Suddenly, all the wealthy families in the city knew that the Qiao family had a fake daughter! A true daughter of an affluent family would be talented, gentle, and kind. A fake daughter would not be able to pick up any skills and accomplish nothing. Everyone wanted to see how miserable she would become when she went back to her ravine after being kicked out of a rich family! Qiao Nian also thought that her biological parents were poor teachers from Luohe County. Who knew that her brother drove a Phaeton that was worth three hundred thousand yuan! Her biological father was also a professor who taught at Tsinghua University! The big boss of the family of scums became a bootlicker and bowed in front of her grandpa… Qiao Nian was dumbfounded. Erm… this wasn’t the same as saying yes! After being freed from the family of scums, Qiao Nian was able to be herself. She was the top student in the college entrance examination, a live broadcast star and the heir of an invaluable cultural heritage… Her identities were revealed and when she started to appear on the hot searches in the city, the family of scums turned green. The anti-fans mocked: What’s the point of trying to fake an image? Aren’t you just sticking to my brother everyday? Qiao Nian responded: I’m sorry but I already have a match. Top Brother: @Qiao Nian. Let me introduce her to everyone. This is my sister. Wealthy Grandpa: My dear granddaughter, why are you working so hard? If you want a bicycle, grandpa will buy it for you! The rich and powerful in Beijing spread a rumor that Master Wang was hiding a wife in his luxurious house. No matter how much people tried to persuade him, he never took her out to meet anyone. If he were asked, he would say the same sentence. “My wife is from the countryside and she is shy.” That was until one day when someone saw the noble and cold Master Wang holding a girl’s slender waist while hiding in a corner of a wall and muttering with red eyes. “Baby, when will you give me a title?” [Fake daughter who is from a truly wealthy family] + [Two big bosses] ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 32,
        title: "My Crown Prince Consort Is a Firecracker!",
        url_parameter: "my-crown-prince-consort-is-a-firecracker",
        chapters: "2666",
        img_link: "https://freewebnovel.com/files/article/image/0/534/534s.jpg",
        link: "/my-crown-prince-consort-is-a-firecracker.html",
        genre: ["Xuanhuan", "Josei", "Romance", "Comedy"],
        author: ["Zi Yunxi", "梓云溪"],
        description:
            "\n\n A genius talisman practitioner is reborn as a seven-year-old girl! However, her innocent appearance belies her vicious personality. In the remote countryside, the Crown Prince runs into her, beating up her enemy. She is indifferent, but it’s love at first sight for the Crown Prince! “Not good, Your Highness the Crown Prince, Her Highness the Crown Prince Consort used an immobilization talisman on His Majesty the Emperor, and His Majesty is currently eating dirt in the main hall.” “Isn’t that normal? Who told that dog emperor to provoke my wife? I say it’s a job well done! Pour a bucket of ice water on him to cool him down!” ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 33,
        title: "Monster Integration",
        url_parameter: "monster-integration",
        chapters: "3366",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1297/1297s.jpg",
        link: "/monster-integration.html",
        genre: ["Fantasy", "Adventure", "Sci-fi", "Action", "Romance"],
        author: ["Anwan"],
        description:
            "\n\n In the world where Humans and Monster’s form a bond and fight together, the world where both Evolve together to get stronger. Walk with Micheal as he starts his adventures with his Silver Sparrow, overcomes countless obstacle and adversaries to fulfill his greatest Dreams. The initial and new chapters getting edited everyday. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 34,
        title: "Astral Pet Store",
        url_parameter: "astral-pet-store",
        chapters: "1581",
        img_link: "https://freewebnovel.com/files/article/image/0/679/679s.jpg",
        link: "/astral-pet-store.html",
        genre: [
            "Action",
            "Adventure",
            "Comedy",
            "Fantasy",
            "School Life",
            "Xuanhuan",
        ],
        author: ["Ancient Xi", "Gu Xi", "古羲"],
        description:
            "\n\n What’s not to love about my new life after transmigrating into a Pet-centered world? There are mighty creatures that come in all shapes and sizes. They can either be cuddly companions, helpers in your daily life, daring scouts or strong fighters. Or all of the above. Not bad, huh? I have a family, but the fact is completely overshadowed by my younger sister. She thoroughly hates my guts, and she makes sure that I know this. Every. Single. Day. Did I mention that she’s disgustingly talented while I am a bottom feeder? A terribly handsome one at that. I have free rein to run the family business on my own. A small and quaint Pet Store. It should have been great if not for the fact that the previous owner of this body was born with ZERO affinity to handle Astral Pets… It wouldn’t be a proper transmigration without a gimmick or a system to pave my road to greatness, don’t you think? I have one, but I don’t know if I would be better off without it… ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 35,
        title: "The Author's POV",
        url_parameter: "the-authors-pov",
        chapters: "862",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1904/1904s.jpg",
        link: "/the-authors-pov.html",
        genre: ["Action", "Adventure", "Comedy", "Fantasy", "Romance"],
        author: ["Entrail_JI"],
        description:
            "\n\nThe person whom the world revolves around.The person who defeats all of his opponents, and ultimately gets the beautiful girl.The sole existence all villains fear.That is the protagonist.What about me?As a failed author who had only one success throughout his whole career, I had reincarnated into my late novel.This is itI thought, as I tightly clenched my fist.Did I just get reincarnated in my own novel?Is this where I reincarnate in a novel and become the protagonist?No.Sadly it's not that kind of novel, as I reincarnated as a mob.The world doesn't revolve around me.The girls don't come flocking towards me.The cheat items don't come to me.PhewI let out a sigh of relief.Thank god I'm not the protagonistI joyfully shouted as tears streamed down my cheeks.Wait, are you curious as to why I don't want to be the protagonist?I did forget to mention the most important thing when I was describing a protagonist.That is...They are calamity magnets.I just died. If I learned something from that, it's that it really isn't a pleasant experience.If possible let me live a long stable life.Thank you, whoever reincarnated me.I would later come to regret these words... ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 36,
        title: "Blood Warlock: Succubus Partner In The Apocalypse",
        url_parameter: "blood-warlock-succubus-partner-in-the-apocalypse-novel",
        chapters: "1325",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1777/1777s.jpg",
        link: "/blood-warlock-succubus-partner-in-the-apocalypse-novel.html",
        genre: [
            "Romance",
            "Adventure",
            "Supernatural",
            "Martial Arts",
            "Action",
        ],
        author: ["XIETIAN"],
        description:
            "\n\nThe legendary mana finally reached planet Earth, causing all living things to officially enter the path of evolution.Animals turned into terrifying beasts, some plants gained self-awareness, and humans who managed to withstand the wave of mana awakened the ability to acquire skills by defeating powerful enemies.The entire planet entered a new era where the old laws fell. The only law was the law of the jungle where the strongest devoured the weakest.Bai Zemin, an apparently normal college student, turned out to be an unparalleled genius in the path of magic. This caught the attention of a beautiful demoness who would become his partner in this journey to the absolute top.God, Angel, Demon, Dragon, Vampire, Werewolf; no existence will be worthy of being his enemy! ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 37,
        title: "The Long-awaited Mr Han",
        url_parameter: "the-long-awaited-mr-han",
        chapters: "3588",
        img_link: "https://freewebnovel.com/files/article/image/0/532/532s.jpg",
        link: "/the-long-awaited-mr-han.html",
        genre: ["Romance", "Josei"],
        author: ["As If Dawn", "恍若晨曦"],
        description:
            "\n\n “Take me in, I’ll do anything you want me to!” In her previous life, Lu Man is sent to prison after being framed by her step-sister and an asshole. After being released from prison, the only thing that greets her is her mother’s tombstone. Seeing the asshole and bitch getting happily along together like one big family with her birth father and step-mother, she sets out to die together with the asshole and her step-sister in fiery flames. The moment she opens her eyes again, she finds herself back on the very day she was framed. Resolutely jumping out the window and climbing next door, she seeks refuge from the man occupying the room there. But who would have guessed that the man is the brilliant hunk she has always admired from afar in her past life? She vows to rub her eyes clean and be more discerning of people. She wants to make everyone who owed her in the past to pay her back! “Young Master Han, can you let me hug your other arm too?” “Actually, I have one more, do you want it?” “...” ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 38,
        title: "Star Odyssey",
        url_parameter: "star-odyssey",
        chapters: "2259",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1698/1698s.jpg",
        link: "/star-odyssey.html",
        genre: ["Action", "Adventure", "Harem", "Sci-fi", "Seinen", "Xuanhuan"],
        author: ["Along With The Wind", "随散飘风"],
        description:
            "\n\nJoin Lu Yin on an epic journey across the Universe, pursuing the truth and tragedy of his past. This is a world of science fantasy where the older generations step back and allow the young to take charge of affairs. Heart-wrenching separations, terrifying situations, all with comic relief that will leave you coming back for more. This is a world where the other characters actually matter, and are revisited frequently as their own lives unfold. Dotting Lu Yin’s path are monumental feats of kingdom-building and treacherous political situations where he must tread carefully if he wants to get to the truth of his history. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 39,
        title: "Overgeared",
        url_parameter: "overgeared-novel",
        chapters: "1884",
        img_link: "https://freewebnovel.com/files/article/image/0/580/580s.jpg",
        link: "/overgeared-novel.html",
        genre: ["Sci-fi", "Comedy", "Action", "Fantasy", "Harem", "Adventure"],
        author: ["Park Saenal"],
        description:
            "\n\nAs Shin Youngwoo has had an unfortunate life and is now stuck carrying bricks on construction sites. He even had to do labor in the VR game, Satisfy!However, luck would soon enter his hopeless life. His character, ‘Grid’, would discover the Northern End Cave for a quest, and in that place, he would find ‘Pagma’s Rare Book’ and become a legendary class player…Translator: Rainbow TurtleEditors: LD and Superposhposh ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 40,
        title: "Dimensional Descent",
        url_parameter: "dimensional-descent",
        chapters: "2090",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1778/1778s.jpg",
        link: "/dimensional-descent.html",
        genre: ["Fantasy", "Adventure", "Historical", "Romance"],
        author: ["Awespec"],
        description:
            "\n\nThe Third Dimension is collapsing. The Fourth Dimension is descending.First it seemed that only technology would evolve, but who knew the world itself could too? It wasn’t as simple as climate change or tectonic movement. No, the fundamental laws of physics that governed everything were changing.Leonel was fairly lucky. His family was decently well off, his father loved him enough to brew vomit inducing nutrient rich smoothies every morning, and this was both the day of the National Championship and his 521st confession to his dream girl, Aina. As his father always said, nothing was more important than respect and persistence.Unfortunately, everything changed that night. At the after party of ages, the world reached a saturation point and an apocalypse descended.Abilities awakened. Sub-Dimensional Zones opened. Invalids rampaged through the Earth like a virus...Those who could evolve would have a slim chance for survival. Those who couldn’t would die.This novel will be a unique spin on the dungeon/system genre. Dungeons won't be dungeons and the system won't be a system... Take a look to find out what I maen :) ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 41,
        title: "Cultivation Chat Group",
        url_parameter: "cultivation-chat-group",
        chapters: "2229",
        img_link: "https://freewebnovel.com/files/article/image/0/440/440s.jpg",
        link: "/cultivation-chat-group.html",
        genre: [
            "Romance",
            "Adventure",
            "Action",
            "Xianxia",
            "Comedy",
            "Slice of Life",
            "Martial Arts",
            "Fantasy",
            "School Life",
        ],
        author: ["Legend Of The Paladin", "圣骑士的传说"],
        description:
            "\n\n One day, Song Shuhang was suddenly added to a chat group with many seniors that suffered from chuuni disease. The people inside the group would call each other ‘Fellow Daoist’ and had all different kinds of titles: Palace Master, Cave Lord, True Monarch, Immortal Master, etc. And even the pet of the founder of the group that had run away from home was called ‘monster dog’. They would talk all day about pill refining, exploring ancient ruins, or share their experience on techniques. However, after lurking inside the group for a while, he discovered that not all was what it seemed… ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 42,
        title: "Cultivation Online",
        url_parameter: "cultivation-online-novel",
        chapters: "1181",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1427/1427s.jpg",
        link: "/cultivation-online-novel.html",
        genre: ["Adventure", "Comedy", "Romance", "Action", "Harem", "Game"],
        author: ["Mylittlebrother"],
        description:
            "\n\n Yuan was born with an incurable illness that left him blind at a young age and crippled a few years later, rendering everything below his head useless. Deemed hopeless and irredeemable, his parents quickly gave up on him, and the world ignored him. In this dark and still world, his younger sister became his sole reason for living. Watch as this young man reaches for the apex as a genius in Cultivation Online, the newest VRMMORPG, becoming a legendary figure in both worlds. --------------------- Disclaimer: The MC is extremely overpowered and talented but also naive/innocent at first due to his illness. If you cannot wait for character developments and dislike OP MCs, this is not your cup of tea. Furthermore, the ’Earth’ in this novel is not the same Earth we are currently living on so do not use our common sense for this novel. This is pure fantasy, after all. --------------------- Follow me on Instagram for Character Illustrations: @Webnovel_MLB ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 43,
        title: "Death… And Me",
        url_parameter: "death-and-me",
        chapters: "2188",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1760/1760s.jpg",
        link: "/death-and-me.html",
        genre: ["Fantasy", "Adventure", "Comedy", "Action"],
        author: ["Suiyan"],
        description:
            "\n\nDue to a problem in his soul, Rean never cared about anything in his life. Even though he died heroically, there wasn’t really a 'will' behind that action.But it was during the last moments of his life that Rean’s soul finally awakened. Too late, though. He died anyway.Later that day in the morgue, Death appeared by his side to send Rean’s soul into the Path of Reincarnation. Unfortunately for him, Rean’s Soul had other plans.Follow those two Main Characters as they adventure into a completely new world separated from their Universe… as reincarnated twins! ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 44,
        title: "Godly Stay-Home Dad",
        url_parameter: "godly-stay-home-dad",
        chapters: "1707",
        img_link: "https://freewebnovel.com/files/article/image/0/545/545s.jpg",
        link: "/godly-stay-home-dad.html",
        genre: [
            "Supernatural",
            "Romance",
            "Fantasy",
            "Martial Arts",
            "Slice of Life",
            "Comedy",
            "Action",
            "Xuanhuan",
            "Drama",
        ],
        author: ["单王张", "Shan Wang Zhang"],
        description:
            "\n\n Hero Zhang Han was frustrated in life originally, but he stepped into the Cultivation World by a stroke of luck. Possessing divine natural gifts, he ascended into the disaster-crossing period step by step. He had imagined his life would not have any hardships anymore, but unfortunately incurred the god thunder since he violated the fate. After he woke up, he was surprised to find that he was reborn, going back a few years ago. He found that the world was different from what it used to be after his rebirth and he had a lovely daughter. Zhang Han’s fate thus underwent a huge transformation. In the fast-paced urban life, he opened up a place for his daughter to have fun. Because of his daughter’s enthusiasm for food, he opened a restaurant, which attracted countless diners. His business was booming and money did roll in. In his spare time, he also wrote songs to earn extra income. At the same time, he performed a sweet love story with his daughter’s mother… After his rebirth, he became a godly stay-home dad in the accumulation of experience. “Dote on my daughter and love my daughter” became his life creed. Although a few nasty guys occasionally appeared in his life, they were all beaten off by virtue of his mightiness. Let’s take a look at how this godly stay-home dad lived in the city and how Zhang Han led his happy life. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 45,
        title: "Journey To Become A True God",
        url_parameter: "journey-to-become-a-true-god",
        chapters: "2673",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1453/1453s.jpg",
        link: "/journey-to-become-a-true-god.html",
        genre: ["Fantasy", "Mature", "Harem", "Romance"],
        author: ["Darkforces"],
        description:
            "\n\n Ye Chen was an honest and hardworking man, but he caught his girlfriend who was having an affair with a wealthy second generation, because of his sadness he decided to return to his hometown to calm down, while on his way he met a god cultivator and ended up being his student . After that his life began to change, on the right and left arms holding the Beautiful girl, from the start of the School flower, rich young women, beautiful teachers, beauty Ceo, famous beauty stars, beautiful goddesses. one by one the women came to him ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 46,
        title: "The Great Mage Returns After 4000 Years",
        url_parameter: "the-great-mage-returns-after-4000-years",
        chapters: "737",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1606/1606s.jpg",
        link: "/the-great-mage-returns-after-4000-years.html",
        genre: [
            "Action",
            "Adventure",
            "Fantasy",
            "Martial Arts",
            "Mystery",
            "Shounen",
            "Supernatural",
        ],
        author: ["낙하산"],
        description:
            "\n\n The worst student of Westroad Academy. The disgrace of the Blake House. A new soul enters the body of Frey Blake, who couldn’t overcome his miserable life and chose death instead. “What’s with this body? I’ll have to work on tuning it from scratch.” The Great Mage Lucas Traumen, with the body of Frey Blake, gains a chance at revenge! ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 47,
        title: "Tyranny Of Steel",
        url_parameter: "tyranny-of-steel",
        chapters: "1253",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1854/1854s.jpg",
        link: "/tyranny-of-steel.html",
        genre: ["Historical", "Adventure", "Action", "Romance", "Harem"],
        author: ["Zentmeister"],
        description:
            "\n\nJulian Weber is an officer in the U.S. Army Corps of Engineers and a graduate of Westpoint Military Academy with a degree in civil engineering. As U.S. involvement in Afghanistan comes to an end, Lt. Julian Weber finds himself involved in a terrorist attack by the Taliban, which claims his life. However, he quickly finds out that death is not always final as he is reincarnated into the body of a Baron’s son and heir in an alternate Earth set in Late-Medieval Europe. In an era of political turmoil and civil strife, the Baron's young son is named Regent of the Barony of Kufstein and forced to contend with feudal powers. Will he be able to institute reforms leading his Barony into the age of industry? Or will he succumb to the pressure of his feudal overlords and a corrupt church that seek dominion overall? ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 48,
        title: "God Emperor",
        url_parameter: "god-emperor",
        chapters: "2594",
        img_link: "https://freewebnovel.com/files/article/image/0/516/516s.jpg",
        link: "/god-emperor.html",
        genre: [
            "Xuanhuan",
            "Adventure",
            "Martial Arts",
            "Harem",
            "Fantasy",
            "Action",
        ],
        author: ["飞天鱼", "Flying Fish"],
        description:
            "\n\n Zhang Ruo Chen was the sole male heir of one of the nine emperors of the Kunlun Field. Ruo Chen’s father was known to all as the “Enlightened Emperor”, however Ruo Chen didn’t just leech off his status as emperor’s son. He proved himself to be a dragon amongst men, possessing a heaven defying body, and managing to cultivate to Greater Perfection within the Yellow Horizon Realm, at just the young age of 16. But even though he stood at the summit of the younger generation and had a boundless future, he sadly died at the treacherous hands of his own fiancee at a young age. Reincarnated 800 years later in the body of a young boy who shares his name, he found out his former fiancee already unified Kunlun’s Field and built the First Central Empire, and was now known as Empress Chi Yao... Empress Chi Yao—Her Majesty governed the mortal world and enjoyed prestige in all directions as well as an eternal life. Zhang Ruochen stood outside of the Imperial Ancestral Temple, looking at the statue of Empress Chi Yao, and the flames of hatred burned in his heart. “After I practice for 13 years, I shall send the empress to her doom!” ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
    {
        id: 49,
        title: "The Demonic King Chases His Wife: The Rebellious Good-for-Nothing Miss",
        url_parameter:
            "the-demonic-king-chases-his-wife-the-rebellious-good-for-nothing-miss",
        chapters: "2520",
        img_link:
            "https://freewebnovel.com/files/article/image/1/1067/1067s.jpg",
        link: "/the-demonic-king-chases-his-wife-the-rebellious-good-for-nothing-miss.html",
        genre: [
            "Historical",
            "Martial Arts",
            "Mature",
            "Action",
            "Xianxia",
            "Adventure",
            "Fantasy",
            "Romance",
            "Shoujo",
            "Comedy",
        ],
        author: ["苏小暖", "Su Xiao Nuan"],
        description:
            "\n\n She, a renowned assassin of the 21st century, actually crossed over to become Su Manor’s most useless good-for-nothing Fourth Miss. He, Jin Empire’s imperial highness, was an emotionless overbearing demonic tyrant with unrivaled talent. Everyone knew that she was idiotic and good-for-nothing and bullied her as they pleased. But only he, the overbearing tyrant with the discerning eye, wouldn’t let go of her even if his life depended on it. For the time being, let’s just see how the stubborn versus stubborn clash and play out in this good show of the chaser and the chased. ……………………………………………………………\nDear readers! Fresh green style, maybe you will like it more in bednovel.com.\n\n",
    },
];
export const scrapeAndUpdate = async () => {
    console.log("Scraping Started");
    // data.map((x) => console.log(x));
    // try {
    //     const genres = await scrapeGetAllGenres();

    //     genres.map(async (data, idx) => {
    //         const [found, created] = await Genre.findOrCreate({
    //             where: { title: data.title },
    //             defaults: {
    //                 title: data.title,
    //                 description: data.description,
    //                 active: true,
    //                 link: data.link,
    //             },
    //         });
    //         if (found) {
    //             if (found.link !== data.link) {
    //                 await Genre.update({ link: data.link });
    //             }
    //             if (found.description !== data.description) {
    //                 await Genre.update({ description: data.description });
    //             }
    //         }
    //     });
    // } catch (err) {
    //     throw err;
    // }

    try {
        // const novels = await scrapeMostPopularNovelsUrlData();
        const novels = data;
        console.log("finished");

        for (let data of novels) {
            console.log(data.id, data.title, data.genre);
            const findNovelInDB = await Novel.findOne({
                where: { title: data.title },
            });
            // console.log(findNovelInDB.toJSON());

            if (!findNovelInDB) {
                const create = await Novel.create({
                    title: data.title,
                    chapters: data.chapters,
                    description: data.description,
                    url_parameter: data.url_parameter,
                    status: "ongoing",
                    active: 1,
                    image_link: data.img_link,
                    link: data.link,
                });
            }

            data.genre.map(async (genre) => {
                const getGenreId = await Genre.findOne({
                    where: { title: genre },
                });
                // console.log(getGenreId.toJSON());
                const findGenre = await Genre_Novel.findOne({
                    where: {
                        [Op.and]: [
                            { url_parameter: data.url_parameter },
                            { genre_id: getGenreId.id },
                            { novel_id: Number(data.id) + 1 },
                        ],
                    },
                });
                console.log(findGenre);
                if (!findGenre) {
                    const insert = await Genre_Novel.create({
                        genre_id: getGenreId.id,
                        novel_id: data.id + 1,
                        url_parameter: data.url_parameter,
                    });
                }
            });
            // }
            // console.log(findNovelInDB.toJSON());

            if (
                findNovelInDB &&
                findNovelInDB.chapters !== Number(data.chapters)
                // &&findNovelInDB.url_parameter !== data.url_parameter
                // findNovelInDB.author !== data.author &&
                // findNovelInDB.description !== data.description
            ) {
                console.log(
                    ` UPDATED_NOVEL::${data.title}::${data.chapters}::${findNovelInDB.chapters}`
                );
                const update = await Novel.update(
                    {
                        chapters: data.chapters,
                        // url_parameter: data.url_parameter,
                        // author: JSON.stringify(data.author),
                        // description: data.description,
                        updated_at: Date.now(),
                    },
                    { where: { title: data.title } }
                );
            }
        }
        console.log("Scraping Ended");
        return;
    } catch (err) {
        throw err;
    }
};
