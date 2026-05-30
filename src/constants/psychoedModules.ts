export interface PsychoedModule {
  id: string;
  title: { en: string; tw: string };
  summary: { en: string; tw: string };
  readTimeMinutes: number;
  sections: {
    heading: { en: string; tw: string };
    body: { en: string; tw: string };
  }[];
}

export const PSYCHOED_MODULES: PsychoedModule[] = [
  {
    id: "what-is-mental-health",
    title: {
      en: "What is mental health?",
      tw: "Deɛn ne adwene mu ahoɔden?",
    },
    summary: {
      en: "Mental health is not just the absence of illness. Learn what it really means and why it matters.",
      tw: "Adwene mu ahoɔden nyɛ sɛ yareɛ biara nni wo so nko. Sua nea ɛkyerɛ ampa ne sɛnea ɛho hia.",
    },
    readTimeMinutes: 4,
    sections: [
      {
        heading: { en: "More than 'not being mad'", tw: "Ɛboro sɛ 'wo nnyɛ bɔdam'" },
        body: {
          en: "In Ghana, people sometimes say \"adwene mu yareɛ\" only means someone is \"mad.\" But mental health is a spectrum — it includes how you think, feel, and cope with daily life. Everyone has mental health, just like everyone has physical health.",
          tw: "Wɔ Ghana, nnipa ka sɛ \"adwene mu yareɛ\" kyerɛ sɛ obi \"abɔ dam\" nko ara. Nanso adwene mu ahoɔden yɛ kwan tenten — ɛka sɛnea wodwene, sɛnea wote wo ho, ne sɛnea wotumi fa wo ho hyɛ da biara mu. Obiara wɔ adwene mu ahoɔden, sɛnea obiara wɔ honam mu ahoɔden.",
        },
      },
      {
        heading: { en: "Signs your mental health needs attention", tw: "Nsɛnkyerɛnneɛ sɛ wo adwene mu hia nhwɛ" },
        body: {
          en: "Trouble sleeping for weeks. Losing interest in things you used to enjoy. Feeling irritable or tearful most days. Withdrawing from friends and family. These are not signs of weakness — they are signals your mind is asking for support.",
          tw: "Wo nna nna nnawɔtwe pii. Nneɛma a na ɛyɛ wo dɛ no ɛnyɛ wo dɛ bio. Da biara wo bo fu anaa wosu. Wo ne wo nnamfo ne wo abusua nkasa. Eyinom nyɛ mmerɛyɛ nsɛnkyerɛnneɛ — ɛyɛ nsɛnkyerɛnneɛ sɛ wo adwene rehia mmoa.",
        },
      },
      {
        heading: { en: "What you can do", tw: "Deɛ wubetumi ayɛ" },
        body: {
          en: "Talk to someone you trust. Use a coping tool like breathing exercises. Check in with your mood daily. Remember: asking for help is strength, not weakness.",
          tw: "Ka kyerɛ obi a wode wo ho to ne so. Fa nnwinnade bi te sɛ ahome nhyehyɛeɛ di dwuma. Hwɛ wo tebea da biara. Kae: sɛ wobisa mmoa a, ɛyɛ akokoduro, ɛnyɛ mmerɛyɛ.",
        },
      },
    ],
  },
  {
    id: "understanding-anxiety",
    title: {
      en: "Understanding anxiety",
      tw: "Ehu ne ahopopo ho ntease",
    },
    summary: {
      en: "That racing heart, the tight chest — your body's alarm system. Learn what anxiety is and how to calm it.",
      tw: "Wo koma a ɛbɔ ntɛm, wo koko a ɛyɛ tight — wo honam alarm system. Sua nea ehu yɛ ne sɛnea wobɛdwo.",
    },
    readTimeMinutes: 5,
    sections: [
      {
        heading: { en: "Your body's alarm system", tw: "Wo honam alarm nhyehyɛeɛ" },
        body: {
          en: "Anxiety is your brain's way of saying \"danger ahead!\" — even when there's no real danger. Your heart beats faster, your palms sweat, your mind races. This is the \"fight or flight\" response. It kept our ancestors alive, but in modern life, it can fire too often.",
          tw: "Ehu yɛ kwan a wo adwene fa so ka sɛ \"asiane wɔ anim!\" — mpo bere a asiane biara nni hɔ. Wo koma bɔ ntɛm, wo nsam fɛw, wo adwene tu mmirika. Yei ne \"ko anaa guan\" response. Ɛboaa yɛn nananom sɛ wɔbɛnya nkwa, nanso nnɛ yi, ɛtumi hyɛ ase mpɛn pii dodo.",
        },
      },
      {
        heading: { en: "Common triggers in Ghana", tw: "Nneɛma a ɛma ehu ba wɔ Ghana" },
        body: {
          en: "Exam pressure (WASSCE, BECE). Money worries and debts. Family expectations about career or marriage. Health scares. Social media comparison. These are all normal triggers — having anxiety about them does not mean something is wrong with you.",
          tw: "Exams pressure (WASSCE, BECE). Sika haw ne aka. Abusua nhyehyɛeɛ fa adwuma anaa aware ho. Apomuden ehu. Social media nhyɛase. Eyinom nyinaa yɛ nneɛma a ɛma ehu ba — sɛ ɛma wo hu a, ɛnkyerɛ sɛ biribi bɔne wɔ wo ho.",
        },
      },
      {
        heading: { en: "Quick calming techniques", tw: "Kwan a wobɛfa so adwo ntɛm" },
        body: {
          en: "4-7-8 breathing: breathe in for 4 counts, hold for 7, breathe out for 8. The 5-4-3-2-1 grounding technique: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. These work because they bring your attention back to the present moment.",
          tw: "4-7-8 ahome: home mframa ma 4, kura mu ma 7, yi firi mu ma 8. 5-4-3-2-1 fa ho sie nhyehyɛeɛ: ka nneɛma 5 a wuhu, 4 a wote, 3 a wode wo nsa ka, 2 a wo hwam, 1 a wode da. Eyinom yɛ adwuma ɛfiri sɛ ɛma wo adwene san ba nea ɛreba seesei no so.",
        },
      },
    ],
  },
  {
    id: "depression-basics",
    title: {
      en: "When sadness stays too long",
      tw: "Bere a awerɛhow tena kyɛ dodo",
    },
    summary: {
      en: "Sadness is normal, but when it doesn't lift for weeks, something deeper may be going on.",
      tw: "Awerɛhow yɛ ade a ɛyɛ daa, nanso sɛ ɛntew mu nnawɔtwe pii a, biribi a emu dɔ nka wɔ mu.",
    },
    readTimeMinutes: 5,
    sections: [
      {
        heading: { en: "Sadness vs. depression", tw: "Awerɛhow ne depression" },
        body: {
          en: "Everyone feels sad sometimes — after a breakup, losing a job, or a death in the family. But when the sadness lasts most of the day, nearly every day, for two weeks or more, and you lose interest in things you used to enjoy, it may be depression. Depression is not laziness or spiritual weakness.",
          tw: "Obiara te awerɛhow bere bi — aware a ɛbubu, adwuma a wohwere, anaa owu a ɛba abusua mu. Nanso sɛ awerɛhow no tena adekyeeɛ nyinaa, bɛyɛ da biara, nnawɔtwe abien anaa nea ɛboro so, na nneɛma a na ɛyɛ wo dɛ no ɛnyɛ wo dɛ bio a, ebia ɛyɛ depression. Depression nyɛ anihaw anaa honhom mu mmerɛyɛ.",
        },
      },
      {
        heading: { en: "What it looks like", tw: "Sɛnea ɛte" },
        body: {
          en: "Sleeping too much or too little. Eating more or less than usual. Feeling worthless or guilty. Difficulty concentrating. Pulling away from people. Feeling empty or numb inside. If you notice several of these, it's worth talking to someone.",
          tw: "Woda pii dodo anaa kakra dodo. Wodi aduan pii anaa kakra sene daa. Wote sɛ wonni boɔ anaa wudi fɔ. Ɛyɛ den sɛ wode wo adwene si biribi so. Wo ne nnipa nkɔ. Wote sɛ wo mu yɛ hunu anaa wote sɛ wonne nkate. Sɛ wohu eyinom mu pii a, ɛfata sɛ woka kyerɛ obi.",
        },
      },
      {
        heading: { en: "It's treatable", tw: "Wɔtumi sa" },
        body: {
          en: "Depression is one of the most treatable mental health conditions. Talking to a counsellor, staying connected with others, regular exercise, and sometimes medication can all help. You don't have to suffer in silence.",
          tw: "Depression yɛ adwene mu yareɛ a wɔtumi sa no biako. Sɛ woka kyerɛ counsellor, wone nnipa bɔ mu, wo yɛ exercise daa, na bere bi so nnuro betumi aboa wo. Ɛnsɛ sɛ wohu amane wɔ komm mu.",
        },
      },
    ],
  },
  {
    id: "stress-management",
    title: {
      en: "Managing everyday stress",
      tw: "Da biara stress ho nhyehyɛeɛ",
    },
    summary: {
      en: "Stress is unavoidable, but how you respond to it makes all the difference.",
      tw: "Stress no, wobɛnya no daa, nanso sɛnea wubu ano no na ɛsesa biribiara.",
    },
    readTimeMinutes: 4,
    sections: [
      {
        heading: { en: "Good stress vs. bad stress", tw: "Stress pa ne stress bɔne" },
        body: {
          en: "Some stress is helpful — it pushes you to study before an exam or finish a deadline. But when stress stays high for too long without relief, it starts to harm your body and mind. Headaches, stomach problems, irritability, and poor sleep are all signs of chronic stress.",
          tw: "Stress bi yɛ ade pa — ɛpane wo sɛ wubesua ansa na woakɔ exam anaa woawie wo adwuma. Nanso sɛ stress no tena soro kyɛ dodo a ɛnnya ahomegyeɛ a, ɛhyɛ ase sɛe wo honam ne wo adwene. Tirim yaw, yafunu haw, abufuhyeɛ, ne nna a ɛnyɛ dɛ nyinaa yɛ chronic stress nsɛnkyerɛnneɛ.",
        },
      },
      {
        heading: { en: "Simple stress relievers", tw: "Kwan a ɛyɛ mmerɛ a wobɛfa so atew stress" },
        body: {
          en: "Take 3 deep breaths before reacting. Go for a short walk — even 10 minutes helps. Talk to a friend instead of holding it in. Limit social media when you're feeling overwhelmed. Do one thing at a time instead of trying to do everything.",
          tw: "Home mframa pii mprɛnsa ansa na woabu ano. Kɔ nante kakra — mpo simma 10 boa. Ka kyerɛ wo adamfo sene sɛ wokura mu. Tew social media so bere a wo bo afono. Yɛ ade biako biako sene sɛ woyɛ biribiara bɔ mu.",
        },
      },
    ],
  },
  {
    id: "healthy-relationships",
    title: {
      en: "Healthy relationships",
      tw: "Nkutahodie pa",
    },
    summary: {
      en: "Relationships shape your mental health. Learn to recognise what's healthy and what's not.",
      tw: "Nkutahodie hyehye wo adwene mu ahoɔden. Sua sɛnea wobɛhu nea ɛyɛ pa ne nea ɛnyɛ pa.",
    },
    readTimeMinutes: 4,
    sections: [
      {
        heading: { en: "Signs of a healthy relationship", tw: "Nkutahodie pa nsɛnkyerɛnneɛ" },
        body: {
          en: "You feel safe to be yourself. You can disagree without fear. Your partner respects your boundaries. You support each other's goals. You feel happier more often than stressed when you're together.",
          tw: "Wotumi yɛ wo ankasa a suro biara nni mu. Wotumi di wo adwene so a ehu biara nni mu. Wo yɔnko de obuo ma wo nhyeɛ. Mo boa mo ho mo ho wɔ mo botaeɛ mu. Bere a mowɔ bɔ mu no, wo ani gye kyɛn sɛ stress wɔ wo so.",
        },
      },
      {
        heading: { en: "Red flags", tw: "Kɔkɔɔ nsɛnkyerɛnneɛ" },
        body: {
          en: "Controlling behaviour — checking your phone, deciding who you can talk to. Constant criticism that makes you feel small. Jealousy that turns to anger. Physical violence — hitting, slapping, pushing. If you recognise these patterns, please know they are not normal and you deserve better.",
          tw: "Ahyɛ so — ɔhwɛ wo phone, ɔkyerɛ nea wotumi kasa no kyerɛ. Nkasadweɛ a ɛma wote sɛ woho nka hwee. Ninkununyam a ɛdane abufuo. Honam so basabasayɛ — ɔbɔ wo, ɔtwe wo, ɔpam wo. Sɛ wuhu eyinom a, hunu sɛ ɛnyɛ ade a ɛyɛ daa na wofata nea ɛyɛ papa.",
        },
      },
    ],
  },
  {
    id: "grief-and-loss",
    title: {
      en: "Dealing with grief and loss",
      tw: "Owu ne nneɛma a wohwere ho nsɛm",
    },
    summary: {
      en: "Loss is part of life, but grief has no timeline. Learn how to move through it at your own pace.",
      tw: "Nea wohwere no yɛ nkwa mu ade, nanso awerɛhow nni bere a ɛtwa. Sua sɛnea wobɛfa mu wɔ wo ankasa kwan so.",
    },
    readTimeMinutes: 5,
    sections: [
      {
        heading: { en: "Grief in Ghana", tw: "Awerɛhow wɔ Ghana" },
        body: {
          en: "In Ghana, death is communal. The one-week observation, the funeral, the 40th day — these rituals help, but they can also be exhausting. You may feel pressure to \"be strong\" for the family while falling apart inside. That conflict is normal.",
          tw: "Wɔ Ghana, owu yɛ ade a ɛka nnipa nyinaa. One-week, ayie, da a ɛtɔ so 40 — nhyehyɛeɛ yi boa, nanso ɛtumi ma wo brɛ. Ebia wɔhyɛ wo sɛ \"yɛ den\" ma abusua no bere a wo mu agu fam. Sɛ wotete nifa ne benkum ntam a, ɛyɛ ade a ɛyɛ daa.",
        },
      },
      {
        heading: { en: "There's no right way to grieve", tw: "Kwan pa biara nni sɛ wode bɛdi awerɛhow" },
        body: {
          en: "Some people cry every day. Others feel numb. Some throw themselves into work. Some can't get out of bed. All of these are valid responses. Grief is not linear — you might feel better for a week, then worse again. That's normal.",
          tw: "Nnipa bi su da biara. Bi nso nnte biribiara. Bi de wɔn ho hyɛ adwuma mu. Bi ntumi mfi mpaa so nsɔre. Eyinom nyinaa yɛ ade a ɛyɛ daa. Awerɛhow ntaa nkɔ kwan tee so — ebia wobɛte wo ho yie nnawɔtwe biako, na asan ayɛ bɔne bio. Ɛyɛ daa no.",
        },
      },
      {
        heading: { en: "When grief needs professional help", tw: "Bere a awerɛhow hia mmoa a ɛfiri ɔyɛfoɔ" },
        body: {
          en: "If grief is so heavy you can't function after several months, if you think about joining the person who died, or if you're using alcohol or drugs to numb the pain — please talk to a professional. In Ghana, you can contact the Mental Health Authority or visit a district hospital.",
          tw: "Sɛ awerɛhow yɛ duru dodo a wontumi nyɛ biribiara abosome pii akyi, sɛ wodwene sɛ wobɛkɔ akyiri akɔ nea owui no nkyɛn, anaa sɛ wode nsa anaa nnuro na ɛnne yaw no a — mesrɛ wo, ka kyerɛ ɔyɛfoɔ. Wɔ Ghana, wotumi frɛ Mental Health Authority anaa wokɔ district hospital.",
        },
      },
    ],
  },
  {
    id: "sleep-hygiene",
    title: {
      en: "Better sleep habits",
      tw: "Nna pa nhyehyɛeɛ",
    },
    summary: {
      en: "Poor sleep affects everything — mood, concentration, even your physical health. Simple changes can help.",
      tw: "Nna bɔne sɛe biribiara — wo tebea, wo adwene a wode si biribi so, mpo wo honam mu ahoɔden. Nsakraeɛ a ɛyɛ mmerɛ betumi aboa.",
    },
    readTimeMinutes: 3,
    sections: [
      {
        heading: { en: "Why sleep matters", tw: "Sɛnea nna ho hia" },
        body: {
          en: "When you sleep, your brain processes emotions, stores memories, and repairs your body. Skipping sleep doesn't make you tough — it makes everything harder. Students who sleep 7-8 hours perform better on exams than those who cram all night.",
          tw: "Bere a woda no, wo adwene yɛ adwene mu nsɛm ho adwuma, kora nkaeɛ, na ɛsa wo honam yareɛ. Sɛ wonnda a, ɛnkyerɛ sɛ woyɛ den — ɛma biribiara yɛ den. Asukuufoɔ a wɔda dɔnhwerew 7-8 no yɛ yie wɔ exams mu sene wɔn a wɔkenkan anadwo nyinaa.",
        },
      },
      {
        heading: { en: "Tips for better sleep", tw: "Afotuo ma nna pa" },
        body: {
          en: "Try to sleep and wake at the same time daily. Avoid phone screens 30 minutes before bed — the blue light tricks your brain into staying awake. Keep your room cool and dark. If you can't sleep after 20 minutes, get up and do something calm, then try again.",
          tw: "Bɔ mmɔden sɛ wubeda na woasɔre bere koro da biara. Gyae phone screens simma 30 ansa na wobɛda — light no daadaa wo adwene sɛ wontena hɔ. Ma wo dan no yɛ nwunu ne sum. Sɛ simma 20 akyi wontumi anda a, sɔre yɛ ade a ɛyɛ komm, na san bɔ mmɔden.",
        },
      },
    ],
  },
  {
    id: "burnout-and-exhaustion",
    title: {
      en: "Burnout and deep exhaustion",
      tw: "Burnout ne abrabɔ mu brɛ paa",
    },
    summary: {
      en: "When rest no longer feels enough, you may be carrying more than ordinary stress.",
      tw: "Sɛ ahomegyeɛ mpo nte sɛ ɛdɔɔso bio a, ebia woresoa adeɛ a ɛboro stress a yɛtaa nya.",
    },
    readTimeMinutes: 5,
    sections: [
      {
        heading: { en: "What burnout can feel like", tw: "Sɛnea burnout tumi te" },
        body: {
          en: "Burnout is more than being tired after a long day. It can feel like waking up already drained, snapping at people you love, struggling to focus, and losing motivation for work, school, church, or even simple chores. Many people in Ghana carry work pressure, family obligations, and money worries all at once, so burnout can sneak up slowly.",
          tw: "Burnout nyɛ sɛ woabrɛ anadwo bi akyi nko. Ebetumi ayɛ sɛ wosɔre a woabrɛ dedaw, wo bo fuw nnipa a wodɔ wɔn no ntɛm, ɛyɛ den sɛ wode w'adwene si biribi so, na w'anigye wɔ adwuma, sukuu, asɔre, anaa mpo fie dwumadie ho no so te. Nnipa pii wɔ Ghana soa adwuma so, abusua asɛdeɛ ne sika haw bɔ mu, enti burnout tumi ba brɛoo a wonhu.",
        },
      },
      {
        heading: { en: "Common signs to notice", tw: "Nsɛnkyerɛnneɛ a ɛsɛ sɛ wohwɛ" },
        body: {
          en: "You may feel cynical, detached, or constantly guilty for not doing enough. Small tasks start to feel heavy. You may stop replying to messages, avoid people, or depend on caffeine and late-night scrolling to keep going. These are signs that your body and mind are asking for recovery, not punishment.",
          tw: "Ebia wobɛte wo ho sɛ woagyae anidasoɔ, woate wo ho afiri nneɛma ho, anaa wudi fɔ daa sɛ wonyɛ pii. Nneɛma nketenkete mpo bɛyɛ wo duru. Ebetumi ayɛ sɛ wummua messages, woregyae nnipa, anaa wode coffee ne anadwo phone hwɛ na ɛma wokɔ so. Eyinom yɛ nsɛnkyerɛnneɛ sɛ wo honam ne w'adwene rehwehwɛ san-yɛ, ɛnyɛ atemmuo.",
        },
      },
      {
        heading: { en: "Ways to begin recovering", tw: "Kwan a wobɛfa so ahyɛ ase asan ayɛ yie" },
        body: {
          en: "Start by being honest about your limits. Reduce one non-essential task if you can. Eat and sleep more consistently. Ask for practical help, not only encouragement. Even a small reset — one quiet walk, one proper meal, one evening offline — can remind your system that you are not a machine.",
          tw: "Fi aseɛ ka nokorɛ fa nea wotumi ne nea wontumi ho. Tew adwuma baako a ɛnyɛ ahiasɛ so sɛ wotumi a. Di aduan na da wɔ bere pa mu. Bisa mmoa a ɛyɛ adwuma mu, ɛnyɛ nkuranhyɛ nko. Mpo nsakraeɛ ketewa — nante komm baako, aduan pa baako, anadwo baako a wonni online — betumi akae wo nipadua sɛ woyɛ onipa, ɛnyɛ afidie.",
        },
      },
    ],
  },
  {
    id: "social-media-comparison",
    title: {
      en: "Social media and comparison",
      tw: "Social media ne ntotoho",
    },
    summary: {
      en: "When everyone's life looks ahead of yours online, comparison can quietly damage your peace.",
      tw: "Sɛ obiara nkwa te sɛ ɛredi wo anim wɔ online a, ntotoho tumi sɛe wo ahotɔ brɛoo.",
    },
    readTimeMinutes: 4,
    sections: [
      {
        heading: { en: "Why comparison hurts", tw: "Adɛn nti na ntotoho yɛ yaw" },
        body: {
          en: "Most people post highlights, not the full story. You may see weddings, visa approvals, business wins, and glowing photos — but not debt, conflict, grief, loneliness, or fear. Comparing your ordinary Tuesday to someone else's best moment will almost always make you feel behind.",
          tw: "Nnipa pii de wɔn nkwa mu anigyeɛ nkutoo na toto gu online, ɛnyɛ asɛm no nyinaa. Ebia wobɛhu aware, visa a wɔagye ato mu, business nkonimdie, ne mfonini a ɛyɛ fɛ — nanso wonhu aka, ntɔkwa, awerɛhow, ankonam, anaa suro. Sɛ wode wo Benada a ɛyɛ daa toto obi da pa paa ho a, daa na wobɛte sɛ woaka akyi.",
        },
      },
      {
        heading: { en: "Signs you need a reset", tw: "Nsɛnkyerɛnneɛ sɛ wo hia ahomegyeɛ foforɔ" },
        body: {
          en: "You feel worse after scrolling. You start questioning your worth, appearance, income, or timeline. You lose focus on your own goals because you are constantly watching other people. If the app leaves you more anxious than informed, that is useful information.",
          tw: "Sɛ woahwɛ akyi a wote wo ho bɔne koraa. Wohyia aseɛ bisa wo boɔ, wo ho tebea, wo sika, anaa wo bere nhyehyɛeɛ. Wogyae de w'adwene si wo ankasa botaeɛ so efisɛ worehwɛ afoforɔ daa. Sɛ app no ma wuhu ehu kyɛn nsɛm a ɛboa a, ɛno nso yɛ asɛm a ɛho hia.",
        },
      },
      {
        heading: { en: "Healthier ways to use it", tw: "Kwan pa a wobɛfa so adi dwuma" },
        body: {
          en: "Mute accounts that stir shame or pressure. Follow people who teach, encourage, or make you laugh. Set time limits. Before you open an app, ask: \"What do I need right now?\" Connection? Information? A break? Using social media with intention helps you stay in charge of your mood.",
          tw: "Gyae accounts a ɛma aniwuo anaa pressure ba no so. Di nnipa a wɔkyerɛ adeɛ, hyɛ nkuran, anaa wɔma woserew no akyi. Hyɛ bere ano. Ansa na wobebue app no, bisa wo ho sɛ: \"Deɛn na mehia seesei?\" Nkɔmmɔ? Nsɛm? Ahomegyeɛ? Sɛ wode atirimpɔw di social media ho dwuma a, ɛboa ma wote wo tebea so.",
        },
      },
    ],
  },
  {
    id: "supporting-a-friend",
    title: {
      en: "How to support a struggling friend",
      tw: "Sɛnea wobɛboa adamfo a ɔreko",
    },
    summary: {
      en: "You do not need the perfect words to be helpful. Presence, safety, and listening matter a lot.",
      tw: "Enhia sɛ wobɛnya nsɛm a edi mu paa ansa na woaboa. Wo baabi a wowɔ, ahotɔ, ne asotie ho hia paa.",
    },
    readTimeMinutes: 4,
    sections: [
      {
        heading: { en: "Start with listening, not fixing", tw: "Fi ase tie, mmɔ mmɔden sɛ wobɛsesa biribi ntɛm" },
        body: {
          en: "When someone opens up, the pressure to give advice can be strong. But often the first help is simple: listen, stay calm, and believe them. Phrases like \"I'm here with you\" or \"Thank you for telling me\" can help more than long lectures.",
          tw: "Sɛ obi bue ne koko mu ma wo a, ebia wobɛte sɛ ɛsɛ sɛ woma afotuo ntɛm. Nanso mpɛn pii no, mmoa a edi kan no yɛ mmerɛ: tie, yɛ komm, na gye di. Nsɛm te sɛ \"Mewɔ ha ma wo\" anaa \"Meda wo ase sɛ woaka akyerɛ me\" betumi aboa kyɛn ɔkasa tenten.",
        },
      },
      {
        heading: { en: "What not to say", tw: "Nsɛm a ɛnsɛ sɛ woka" },
        body: {
          en: "Avoid saying \"Others have it worse,\" \"Just pray harder,\" or \"Be strong.\" Even if you mean well, those phrases can make someone shut down. Try not to gossip about what they shared. Trust is part of the support.",
          tw: "Gyae sɛ wobɛka sɛ \"Afoforɔ deɛ wɔn deɛ yɛ den sen wo deɛ,\" \"Bɔ mpaeɛ yie kɛkɛ,\" anaa \"Yɛ den.\" Mpo sɛ wopɛ pa a, saa nsɛm no betumi ama obi ato ne ho mu bio. Mma asɛm a wɔka kyerɛ wo no nnyɛ nkurɔfoɔ asɛm. Ahotosoɔ yɛ mmoa no fã.",
        },
      },
      {
        heading: { en: "When to get more help", tw: "Bere a ɛsɛ sɛ wobisa mmoa bio" },
        body: {
          en: "If your friend talks about wanting to die, harming themselves, or disappearing, take it seriously. Stay with them if you can and connect them to emergency or crisis support. You are not betraying them by helping to keep them safe.",
          tw: "Sɛ wo adamfo ka sɛ ɔpɛ sɛ owu, ɔpɛ sɛ ɔyɛ ne ho bɔne, anaa ɔpɛ sɛ ɔyera a, fa no aniberesɛm. Sɛ wotumi a, tena ne nkyɛn na boa no ma ɔnya emergency anaa crisis mmoa. Sɛ woboa ma ɔtena nkwa mu a, ɛnyɛ sɛ woreyi no ama afoforɔ.",
        },
      },
    ],
  },
  {
    id: "betting-and-urge-cycles",
    title: {
      en: "Betting, urges, and shame cycles",
      tw: "Betting, akɔnnɔ, ne aniwuo nkɔso",
    },
    summary: {
      en: "Many people are not only chasing money. They are also chasing relief, hope, or escape.",
      tw: "Nnipa pii mpɛ sika nko. Wɔhwehwɛ ahotɔ, anidasoɔ, anaa kwan a wɔde beguane nso.",
    },
    readTimeMinutes: 5,
    sections: [
      {
        heading: { en: "Why the cycle is powerful", tw: "Adɛn nti na saa nkɔso yi yɛ den" },
        body: {
          en: "Betting can give a quick rush of hope, control, or excitement, especially when life feels stuck. A small win can convince your brain that the next try will save you. After losses come shame, secrecy, and the urge to chase the money back. That loop can trap smart people for a long time.",
          tw: "Betting tumi ma anidasoɔ, tumi, anaa anigyeɛ ba ntɛm, titire bere a nkwa te sɛ ɛagyina hɔ. Nkonimdie ketewa bi tumi daadaa w'adwene sɛ bere a ɛdi hɔ no na ɛbɛgye wo. Sɛ wɔhwere a, aniwuo, sie, ne akɔnnɔ sɛ wobɛsan agye sika no ba. Saa kyinhyia no tumi kyere nnipa a wɔwɔ nyansa mpo kyɛ.",
        },
      },
      {
        heading: { en: "Notice the moment before the bet", tw: "Hwɛ bere a ɛdi bet no anim" },
        body: {
          en: "Many urges start with a feeling: boredom, loneliness, anger, panic, or financial fear. If you can name the feeling before you place the bet, you create a small gap for a different choice. The urge is real, but it does not have to become an action every time.",
          tw: "Mpɛn pii akɔnnɔ no fi nkate bi mu: anibereɛ, ankonam, abufuo, ehu, anaa sika ho suro. Sɛ wotumi frɛ saa nkate no din ansa na wobet to no a, ɛma kwan ketewa bi ba ma gyinaeɛ foforɔ. Akɔnnɔ no yɛ nokorɛ, nanso ɛnsɛ sɛ ɛdan adwuma bere biara.",
        },
      },
      {
        heading: { en: "First steps out of the loop", tw: "Anammɔn a edi kan a ɛbɛyi wo afiri kyinhyia no mu" },
        body: {
          en: "Put distance between you and the app if possible. Tell one honest person what is happening. Track when the urge comes instead of hiding it. Replace the first ten minutes of urge with another action — a walk, a call, a cold drink, or leaving the room. Recovery often starts with interrupting the pattern, not winning one final bet.",
          tw: "Sɛ wotumi a, ma kwan ntam ba wo ne app no ntam. Ka nokorɛ kyerɛ obi baako fa nea ɛrekɔ so ho. Kyerɛw bere a akɔnnɔ no ba no hyɛ mu sen sɛ wobɛsie. Sesa simma du a edi kan a akɔnnɔ no ba no fa adeɛ foforɔ so — nante, frɛ obi, nom nsuo a ɛyɛ nwunu, anaa fi dan no mu kɔ. Mpɛn pii ayaresa fi pattern no a wobɛtwa mu no, ɛnyɛ bet biako a ɛtwa toɔ a wobedi no.",
        },
      },
    ],
  },
];
