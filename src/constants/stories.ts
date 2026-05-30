export interface Story {
  id: string;
  title: { en: string; tw: string };
  summary: { en: string; tw: string };
  readTimeMinutes: number;
  body: { en: string; tw: string };
}

export const STORIES: Story[] = [
  {
    id: "kwame-exams",
    title: {
      en: "Kwame's exam pressure",
      tw: "Kwame ne n'exam pressure",
    },
    summary: {
      en: "A final-year SHS student nearly broke under WASSCE pressure — until he learned to ask for help.",
      tw: "SHS mfieɛ a ɛtwa toɔ sukuuni bɛyɛ sɛ ɔbɔɔ basaa WASSCE pressure ase — kosii sɛ ɔsuaa sɛ ɔbɛbisa mmoa.",
    },
    readTimeMinutes: 4,
    body: {
      en: `Kwame was the firstborn of five. His parents sold provisions at Makola Market and had saved everything for his school fees. "If you don't pass WASSCE," his father said, "there's no money for a second chance."

The pressure built slowly. First he stopped sleeping — lying awake running equations in his head. Then he stopped eating properly, surviving on Indomie and sugar bread. His friends noticed he wasn't laughing anymore, but he told them "I'm fine, chale."

One evening during prep, his hands started shaking so badly he couldn't hold his pen. His friend Esi sat next to him and said quietly, "Kwame, you don't have to carry this alone."

That night, Esi walked him to the school counsellor. He felt shame at first — "Real men don't cry." But the counsellor told him something he never forgot: "Your brain is a muscle too. If you overwork it without rest, it will break down, just like any muscle."

He started sleeping properly. He did breathing exercises before each paper. He passed WASSCE — not with all A's, but he passed. More importantly, he learned that asking for help is not weakness. It's wisdom.

If you're feeling crushed by exams right now, know this: your worth is not your grade. And it's okay to say "I need help."`,
      tw: `Kwame yɛ abakan wɔ mma anum mu. N'awofoɔ tɔn nneɛma wɔ Makola Market na wɔakora sika nyinaa ama ne school fees. "Sɛ woanfa WASSCE a," ne papa kaeɛ, "sika biara nni hɔ ma chance a ɛtɔ so abien."

Pressure no kɔɔ so brɛoo. Adeɛ kan no, ɔgyaee nna — ɔda hɔ a ne tirim yɛ calculations. Ɛnna ɔgyaee adidi pa, Indomie ne sugar bread nko na ɛyɛ ne nkwa. N'adamfoɔ huu sɛ ɔnserew bio, nanso ɔka kyerɛɛ wɔn sɛ "me ho yɛ me, chale."

Anwummerɛ bi wɔ prep bere, ne nsa hyɛɛ ase wosowee dodo sɛ ɔrentumi ankura ne pen. N'adamfo Esi tenaa ne nkyɛn kaeɛ brɛoo sɛ, "Kwame, ɛnsɛ sɛ wosoa yei wo nko."

Saa anadwo no, Esi de no kɔɔ sukuu counsellor nkyɛn. Animguaseɛ kaa no kane — "Mmarima pa nsu." Nanso counsellor no ka kyerɛɛ no ade bi a wankaeɛ da: "Wo adwene nso yɛ muscle. Sɛ wode yɛ adwuma dodo a ɛnnya ahomegyeɛ a, ɛbɛbubu, sɛnea muscle biara te."

Ɔhyɛɛ aseɛ daa pa. Ɔyɛɛ ahome nhyehyɛeɛ ansa na paper biara adi. Ɔfaa WASSCE — ɛnyɛ A nyinaa, nanso ɔfaeɛ. Nea ɛho hia paa ne sɛ, ɔsuaa sɛ sɛ wobisa mmoa a, ɛnyɛ mmerɛyɛ. Ɛyɛ nyansa.

Sɛ exams pressure redi wo seesei a, hunu yei: wo boɔ nyɛ wo grade. Na ɛyɛ sɛ woka sɛ "mehia mmoa."`,
    },
  },
  {
    id: "ama-market-grief",
    title: {
      en: "Ama's loss at the market",
      tw: "Ama ne n'awerɛhow wɔ dwom so",
    },
    summary: {
      en: "When Ama's mother died suddenly, the grief nearly swallowed her. But slowly, she found her way back.",
      tw: "Bere a Ama maame wuiɛ mpofirim no, awerɛhow no bɛyɛ sɛ ɛmenee no. Nanso brɛoo, ɔsane huu ne kwan.",
    },
    readTimeMinutes: 5,
    body: {
      en: `Ama sold waakye every morning at Kaneshie Market, right next to her mother's stall. They'd been side by side for twelve years — since Ama was sixteen. Her mother taught her everything: how to season the rice, how to smile at difficult customers, how to count money fast.

When her mother collapsed one Tuesday morning and didn't wake up, Ama's world stopped. The one-week observation, the funeral planning, the relatives arriving — it all felt like a dream she couldn't wake up from.

After the funeral, everyone went back to their lives. But Ama couldn't. She'd arrive at the market, set up her stall, and then just sit there staring at the empty space where her mother used to be. The waakye burned. Customers left. She stopped caring.

Her neighbor at the market, Auntie Adwoa, noticed. She didn't give advice or quote Bible verses. She just sat with Ama. Sometimes in silence. Sometimes sharing her own story of losing her husband ten years ago. "The pain doesn't go away," Auntie Adwoa said. "But one day you'll carry it differently."

Six months later, Ama was cooking again. Not every day was good. Some mornings she'd cry into the rice pot. But she was there. She was trying.

She told a friend: "I didn't need someone to fix me. I needed someone to sit with me in the dark until I could find the light switch myself."`,
      tw: `Ama tɔn waakye anɔpa biara wɔ Kaneshie Market, ɛbɛn ne maame stall ho. Na wɔatena bɔ mu mfe dumienu — efiri bere a Ama dii mfe dunsia. Ne maame kyerɛɛ no biribiara: sɛnea wobɛhyehye rice no, sɛnea wobɛserew kyerɛ adefrafoɔ a wɔyɛ den, sɛnea wobɛkan sika ntɛm.

Bere a ne maame buu aseɛ Benada anɔpa bi na wanyan bio no, Ama wiase gyinaeɛ. One-week, ayie nhyehyɛeɛ, abusua a wɔreba — ɛyɛɛ sɛ daeɛ a ɔrentumi ansɔre mfiri mu.

Ayie no akyi, obiara sane kɔɔ ne nkwa so. Nanso Ama antumi. Ɔbɛduru market, ɔto ne stall, na ɔtena hɔ hwɛ baabi a ne maame na ɔtena no a ɛyɛ hunu. Waakye no hyew. Adefrafoɔ kɔeɛ. Wanni hwee ho.

Ne fipamni wɔ market no, Auntie Adwoa, huu. Ɔamma afotuo anaa ɔankamu Bible verse. Ɔtenaa Ama nkyɛn. Bere bi wɔ komm mu. Bere bi nso ɔkyɛɛ ne ankasa nsɛm a ɔhweree ne kunu mfe du ni. "Yaw no nkɔ," Auntie Adwoa kaeɛ. "Nanso da bi wobɛsoa no ɔkwan foforɔ so."

Abosome asia akyi no, Ama renoa aduan bio. Ɛnyɛ da biara na ɛyɛ. Anɔpa bi ɔsu guu rice no mu. Nanso na ɔwɔ hɔ. Na ɔrebɔ mmɔden.

Ɔka kyerɛɛ n'adamfo sɛ: "Na menhia obi a ɔbɛsa me yareɛ. Na mehia obi a ɔbɛtena me nkyɛn wɔ esum mu kosii sɛ me ankasa mahu kanea a mede bɛhyerɛn."`,
    },
  },
  {
    id: "kofi-betting",
    title: {
      en: "Kofi and the betting trap",
      tw: "Kofi ne bet a ɛkyeree no",
    },
    summary: {
      en: "What started as 'small money' on BetWay turned into a habit that cost Kofi his school fees and nearly his life.",
      tw: "Nea ɛhyɛɛ aseɛ sɛ 'sika ketewa' wɔ BetWay so danee su a ɛgyee Kofi school fees ne bɛyɛ sɛ ne nkwa.",
    },
    readTimeMinutes: 4,
    body: {
      en: `It started innocently. Kofi's roommate won GHS 500 from a 2-cedi bet on a Chelsea match. "Chale, see money!" That night, Kofi downloaded BetWay.

The first week he won GHS 80. The second week, GHS 200. He felt like a genius. He started skipping lectures to watch matches. He started borrowing money from friends for "bigger stakes."

Then the losing started. GHS 100 gone. Then GHS 300. Then his entire month's feeding money in one night. He told himself "one more bet and I'll recover everything." He didn't.

When his school fees were due, the money was gone. All of it. He'd staked his mother's sacrifice money on a "sure bet" accumulator that lost on the final leg. He couldn't call home. He couldn't face his friends. He sat alone in his room for three days.

The turning point came when his Christian fellowship leader found him. Not with judgment, but with food and a listening ear. "Kofi, betting isn't the problem. The problem is what you're running from. What are you afraid of?"

That question broke something open. Kofi was afraid of being average. Afraid of disappointing his mother. Afraid that without quick money, he'd end up like his father — struggling.

He got help. He joined a support group. He called his mother and told the truth. She cried, but she said: "Wo nkwa ho hia sene school fees biara." (Your life is worth more than any school fees.)

If you're caught in the betting cycle, know this: the next win won't fix what's really hurting. Talk to someone today.`,
      tw: `Ɛhyɛɛ aseɛ brɛoo. Kofi ne ne room adamfo dii GHS 500 firi cedi 2 bet so wɔ Chelsea match so. "Chale, hwɛ sika!" Saa anadwo no, Kofi download yɛɛ BetWay.

Nnawɔtwe a edi kan no ɔdii GHS 80. A ɛtɔ so abien no, GHS 200. Ɔtee ne ho sɛ ɔyɛ ɔbadwemma. Ɔhyɛɛ aseɛ twee ne ho fii lectures mu kɔhwɛɛ matches. Ɔhyɛɛ aseɛ fɛmee sika firi n'adamfoɔ hɔ maa "stakes akɛseɛ."

Ɛnna hwere no hyɛɛ aseɛ. GHS 100 kɔeɛ. Ɛnna GHS 300. Ɛnna ne bosome mu adidi sika nyinaa wɔ anadwo biako mu. Ɔka kyerɛɛ ne ho sɛ "bet biako bio na masan anya biribiara." Wanyaeɛ.

Bere a ne school fees bere duiɛ no, sika no nyinaa kɔeɛ. Ne nyinaa. Ɔde ne maame sacrifice sika betee "sure bet" accumulator so a ɛhweree nan a ɛtwa toɔ no so. Ɔrentumi anfrɛ fie. Ɔrentumi ankyia n'adamfoɔ anim. Ɔtenaa ne room mu ne nko nnansa.

Nsakraeɛ baeɛ bere a ne Christian fellowship panyin huu no. Ɛnyɛ atemmuo, nanso aduan ne aso a ɔde tiee. "Kofi, bet no nyɛ asɛm no. Asɛm no ne nea woreguan firi ho. Deɛn na wosuro?"

Asɛmmisa no buee biribi. Kofi suroo sɛ ɔbɛyɛ average. Ɔsuroo sɛ ɔbɛma ne maame ani agu ase. Ɔsuroo sɛ sɛ wanni quick money a, n'akyiri bɛyɛ sɛ ne papa — haw mu.

Ɔnyaa mmoa. Ɔde ne ho kaa support group mu. Ɔfrɛɛ ne maame ka nokorɛ kyerɛɛ no. Ɔsuiɛ, nanso ɔkaeɛ sɛ: "Wo nkwa ho hia sene school fees biara."

Sɛ bet cycle akyere wo a, hunu yei: win a edi so no rensa nea ɛdi wo yaw ampa no. Ka kyerɛ obi ɛnnɛ.`,
    },
  },
  {
    id: "adjoa-relationship",
    title: {
      en: "Adjoa's toxic relationship",
      tw: "Adjoa ne ne nkutahodie bɔne",
    },
    summary: {
      en: "Adjoa thought love was supposed to hurt — until a friend showed her it wasn't.",
      tw: "Adjoa dwenee sɛ ɔdɔ no ɛsɛ sɛ ɛyɛ yaw — kosii sɛ n'adamfo kyerɛɛ no sɛ ɛnyɛ saa.",
    },
    readTimeMinutes: 4,
    body: {
      en: `Adjoa met Daniel at a church youth programme. He was charming, attentive, everything her friends envied. Within a month, he'd told her she was the most beautiful woman he'd ever seen. Within three months, he'd told her she was nothing without him.

It started with small things. Checking her phone. Asking why she was five minutes late. Getting angry when she talked to male classmates. "It's because I love you too much," he'd say.

Then came the isolation. "Your friends are a bad influence." "Your sister doesn't want us together." One by one, he cut her off from everyone who cared about her.

The first time he hit her, he cried afterwards and bought her a dress. "I'm sorry, it will never happen again." It happened again. And again. Each time followed by tears and gifts and promises.

Adjoa's breaking point came when her roommate Akua noticed bruises on her arm. Akua didn't say "leave him" — she knew that rarely works. Instead she said, "You deserve to feel safe. Does he make you feel safe?"

That simple question planted a seed. Over weeks of honest conversations, Adjoa began to see the pattern. She reached out to a women's support group in Accra. It took time, but she left.

"Love doesn't check your phone at 2am. Love doesn't leave marks on your body. I had to learn that the hard way."

If someone in your life makes you feel afraid, controlled, or small — that is not love. You can reach out for help.`,
      tw: `Adjoa hyiaa Daniel wɔ asɔre abrantieɛ nhyehyɛeɛ so. Ɔyɛ soronko, ɔhwɛ biribiara yie, n'adamfoɔ nyinaa ani beree no. Bosome biako mu, ɔka kyerɛɛ no sɛ ɔyɛ ɔbaa a ne ho yɛ fɛ sene wɔn a wahua. Abosome abiɛsa mu, ɔka kyerɛɛ no sɛ ne nnooma nni hɔ a ɔnni hɔ a.

Ɛhyɛɛ aseɛ wɔ nneɛma nketenkete so. Ɔhwɛɛ ne phone. Ɔbisaa no nti a simma anum rekyɛ no. N'ani beree bere a ɔne ne mmarima nnamfo kasaeɛ. "Me dɔ wo dodo nti," na ɔka saa.

Ɛnna isolation no baeɛ. "W'adamfoɔ influence bɔne bi na wɔwɔ." "Wo nua baa no mpɛ sɛ yɛbɔ mu." Biako biako, ɔtwitwaa no fii obiara a ɔhwɛɛ no no ho.

Bere a edi kan a ɔbɔɔ no no, ɔsuiɛ n'akyi na ɔtɔɔ atadeɛ maa no. "Kafra, ɛrenyɛ bio." Ɛsanee yɛeɛ. Ne bio. Bere biara akyi nsu ne akyɛdeɛ ne bɔhyɛ dii akyi.

Adjoa nsakraeɛ baeɛ bere a ne room adamfo Akua huu mpira so wɔ ne nsa so. Akua anka sɛ "gyaa no" — ɔnim sɛ ɛntaa nyɛ adwuma. Mmom ɔkaeɛ sɛ, "Ɛfata sɛ wote wo ho safe. Ɔma wote wo ho safe?"

Asɛmmisa a ɛyɛ mmerɛ no duaa aba. Nnawɔtwe pii mu a wɔkasae nokorɛ no, Adjoa hyɛɛ aseɛ huu pattern no. Ɔfrɛɛ mmaa support group wɔ Accra. Ɛkyɛɛ kakra, nanso ɔfii mu.

"Ɔdɔ nhwɛ wo phone dawn 2 so. Ɔdɔ ngya agyiraeɛ wɔ wo honam so. Na ɛsɛ sɛ mesuaa no ɔkwan a ɛyɛ den so."

Sɛ obi wɔ wo nkwa mu a ɔma wosuro, ɔhyɛ wo so, anaa ɔma wote wo ho sɛ wonni boɔ a — ɛnyɛ ɔdɔ. Wotumi bisa mmoa.`,
    },
  },
  {
    id: "yaw-japa",
    title: {
      en: "Yaw and the japa loneliness",
      tw: "Yaw ne japa ankonam",
    },
    summary: {
      en: "All his friends left Ghana. Yaw stayed. The loneliness hit harder than he expected.",
      tw: "N'adamfoɔ nyinaa fii Ghana. Yaw tenaa. Ankonam no bɔɔ no den sene nea ɔdwenee.",
    },
    readTimeMinutes: 4,
    body: {
      en: `By his 27th birthday, Yaw was the last one left. Kwesi was in Canada. Ebo in the UK. Nana in Germany. Even Kofi, who always said he'd never leave, got a visa to Dubai.

Every week, his WhatsApp was full of their new lives — snow, shopping malls, paychecks in dollars. "Chale, come! Life is better here." Meanwhile, Yaw was still working at the printing shop in Osu, earning just enough to survive.

He didn't begrudge his friends. He was happy for them. But the loneliness was crushing. Saturday nights that used to be spent at Oxford Street with the boys were now spent alone watching their Instagram stories.

"What's wrong with me?" he started thinking. "Why can't I make it? Am I not good enough?"

The darkest moment came when he seriously considered taking a dangerous boat route to Libya. "If I die trying, at least I tried." That scared him enough to talk to someone.

His older cousin Ato, who'd been abroad and come back, said something that changed his perspective: "Yaw, you're comparing your Chapter 1 to their Chapter 10. They're not posting the loneliness, the cold, the racism, the 16-hour shifts. Japa is not paradise."

Yaw started a small graphic design business from the printing shop. It grew slowly. He joined a young entrepreneurs' group. He found his tribe — people who chose to stay and build.

"I'm not behind. I'm just on a different road. And that's okay."

If you feel left behind while everyone is leaving, remember: your journey is your own. And there's no shame in staying.`,
      tw: `Ne da-awoda a ɛtɔ so 27 so no, Yaw na ɔyɛ nea ɔtena hɔ nko. Kwesi wɔ Canada. Ebo wɔ UK. Nana wɔ Germany. Mpo Kofi, a daa na ɔka sɛ ɔremfi mu da no, nyaa visa kɔɔ Dubai.

Nnawɔtwe biara, ne WhatsApp yɛ ma wɔn nkwa foforɔ — snow, shopping malls, sika wɔ dollars mu. "Chale, bra! Nkwa yɛ papa wɔ ha." Saa bere no, Yaw da so yɛ adwuma wɔ printing shop wɔ Osu, edi sika a ɛbɛto ne nkwa nko.

Ɔannyina n'adamfoɔ kwan mu. Ɔde anigyeɛ maa wɔn. Nanso ankonam no meneee no. Memeneda anadwo a na ɔne mmarima no de di wɔ Oxford Street no, ɔde tena ne nko hwɛ wɔn Instagram stories.

"Deɛn na ɛbɔne wɔ me ho?" ɔhyɛɛ aseɛ dwenee. "Adɛn nti na me ntumi nyɛ? Me ho nka hwee?"

Bere a emu yɛ sum paa no baeɛ bere a ɔdwenee yie sɛ ɔbɛfa po so kwan a ɛyɛ hu akɔ Libya. "Sɛ mewu bɔ mmɔden a, meyɛɛ mmɔden dedaw." Ɛyɛɛ no hu dodo ma ɔkaa kyerɛɛ obi.

Ne nua panyin Ato, a na wakɔ aburokyire asan aba no, kaa ade bi a ɛsakraa ne nhwɛ: "Yaw, wode wo Chapter 1 ne wɔn Chapter 10 retoto. Wɔmfa ankonam no, awɔw no, racism, ne dɔnhwerew 16 shifts no nto so. Japa nyɛ paradise."

Yaw hyɛɛ graphic design business ketewa bi aseɛ firi printing shop no mu. Ɛnyinii brɛoo. Ɔde ne ho kaa young entrepreneurs' kuo mu. Ɔhuu ne man — nnipa a wɔpaw sɛ wɔbɛtena akɔ so ato.

"Menni akyi. Mewɔ ɔkwan foforɔ so. Na ɛyɛ."

Sɛ wote sɛ nnipa nyinaa rekɔ na woatena a, kae: wo kwan yɛ wo dea. Na animguaseɛ biara nni sɛ wotena.`,
    },
  },
  {
    id: "efua-new-mother",
    title: {
      en: "Efua and the quiet overwhelm of new motherhood",
      tw: "Efua ne maame foforɔ brɛ a ɛyɛ komm",
    },
    summary: {
      en: "Everyone expected Efua to glow after childbirth. Instead, she felt numb, guilty, and deeply alone.",
      tw: "Obiara hwɛɛ kwan sɛ Efua ani begye bere a wawoo no. Mmom ɔtee ne ho sɛ ne mu ada, fɔ rebu no, na ɔwɔ ankonam kɛseɛ mu.",
    },
    readTimeMinutes: 5,
    body: {
      en: `When Efua gave birth to her first child in Cape Coast, the house was full for a week. Her mother came. Her aunties came. Church women came with food and prayers. Everyone said, "Congratulations, mummy!" and smiled for photos.

But when the visitors left and the nights grew long, something changed. The baby cried every two hours. Efua barely slept. Some days she stared at the wall while the child slept in her arms. She loved her baby, but she did not feel joy the way people said she should.

Then the guilt started. "Maybe I'm an ungrateful mother." "Maybe other women are stronger than me." She stopped telling the truth when people asked how she was. She smiled and said, "By God's grace, we are fine."

One afternoon, during child welfare clinic, a nurse noticed she was unusually quiet. Instead of rushing past, the nurse sat beside her and asked, "Are you resting at all? Who is checking on you?" Efua burst into tears.

That conversation changed the next few weeks. Her sister started coming every evening so she could sleep. Her husband stopped saying, "Just manage small," and started doing the midnight laundry and bottle washing. Efua learned that struggling after childbirth did not make her a bad mother. It made her a tired human being who needed support.

"I thought I had to carry my baby and my pain with a smile," she later said. "But healing started when I admitted I wasn't okay."

If a new mother in your life seems withdrawn, exhausted, or unlike herself, check on her gently. And if you are that mother, please know that needing help does not cancel your love.`,
      tw: `Bere a Efua woo ne ba a odi kan wɔ Cape Coast no, fie hɔ yɛɛ ma dapɛn baako. Ne maame baeɛ. Ne mmerewa baa no baeɛ. Asɔre mmaa no de aduan ne mpaebɔ baeɛ. Obiara kae sɛ, "Yɛma wo akwaaba, mummy!" na wɔseree mfonini mu.

Nanso bere a ahɔhoɔ no kɔeɛ na anadwo no tenten no, biribi sesaeɛ. Abɔfra no suu dɔnhwerew mmienu biara mu. Efua annya nna papa. Nna bi ɔtenaa hɔ hwɛɛ ɔdan no bere a abɔfra no da ne nsam. Na ɔdɔ ne ba no, nanso anigyeɛ a nnipa kae sɛ ɛsɛ sɛ ɔte no, na ɔnte saa.

Ɛnna fɔdi baeɛ. "Ebia meyɛ maame a mennim adwuma." "Ebia mmaa afoforɔ yɛ den sen me." Ɔgyaee nokorɛ a ɔbɛka bere a wɔbisa sɛ ɔte sɛn no. Ɔserew ka sɛ, "Onyame adom mu, yɛyɛ."

Awia bi wɔ child welfare clinic no, nurse bi huu sɛ ɔyɛ komm dodo. Ansa na ɔretwam no, ɔtenaa Efua nkyɛn bisaa sɛ, "Wo da koraa anaa? Hena na ɔrehwɛ wo?" Efua tuiɛ su.

Saa nkɔmmɔ no sesaa nnawɔtwe a edi hɔ no. Ne nuabaa hyɛɛ aseɛ ba anadwo biara sɛnea ɛbɛyɛ a obetumi ada. Ne kunu gyaee sɛ ɔbɛka, "Yɛ no ketewa kɛkɛ," na ɔhyɛɛ aseɛ yɛɛ anadwo laundry ne bottle ho dwumadie. Efua sũaa sɛ sɛ ɔreko akyire wɔ awo akyi a, ɛnkyerɛ sɛ ɔyɛ maame bɔne. Ɛkyerɛ sɛ ɔyɛ onipa a wabrɛ a ɔhia mmoa.

Ɔkaeɛ akyire yi sɛ, "Meda so dwenee sɛ ɛsɛ sɛ mede me ba ne me yaw nyinaa so serew. Nanso me ayaresa fii aseɛ bere a mekae sɛ me ho nyɛ me."

Sɛ maame foforɔ bi wɔ wo nkwa mu a ɔyɛ komm, ɔabrɛ, anaa ɔte sɛ ɔnyɛ ne ho bio a, bisa ne ho brɛoo. Na sɛ wo ne saa maame no a, hunu sɛ mmoa a wobisa no ntwa wo dɔ so.`,
    },
  },
  {
    id: "kojo-hustle-burnout",
    title: {
      en: "Kojo and the hustle burnout",
      tw: "Kojo ne hustle burnout",
    },
    summary: {
      en: "Kojo called it hard work, but the constant pressure was slowly emptying him out.",
      tw: "Kojo frɛɛ no adwumaden, nanso pressure no de ne mu rehunu brɛoo.",
    },
    readTimeMinutes: 4,
    body: {
      en: `Kojo drove for a delivery company by day and sold phone accessories in the evening at Circle. On weekends he did Bolt rides. "This economy won't respect a lazy man," he liked to joke. His friends admired the hustle. His family relied on it.

But behind the jokes, Kojo was running on fumes. He drank energy drinks instead of eating proper meals. He answered work calls at midnight. He snapped at passengers, argued with his younger siblings, and could not remember the last time he laughed without forcing it.

He kept telling himself, "Let me push for six more months." Six months became a year. His body started warning him first — headaches, tight shoulders, stomach pain. Then his mind followed. At traffic lights he would suddenly feel blank, as if he had left himself somewhere behind.

The wake-up call came when he forgot a simple delivery route he had driven for months. He parked under a tree in Dzorwulu and sat in silence. Instead of starting the engine again, he called his friend Malik and said, "Bro, I think I've hit the wall."

Malik did not shame him. He helped Kojo talk to his supervisor about reducing one shift. Kojo stopped weekend driving for a while. He started taking one real meal and one quiet evening seriously. The money was still tight, but his chest no longer felt like it was carrying a stone every day.

"I thought rest was for rich people," Kojo said later. "Now I know burnout can make even strong people fall."

If your hustle has become survival with no breathing room, it may be time to change the pace before your body changes it for you.`,
      tw: `Kojo yɛɛ delivery company mu driver awia, na anwummerɛ ɔtɔn phone accessories wɔ Circle. Weekend nso ɔyɛ Bolt rides. Ɔtaa ka sɛ, "Economy yi remmu ɔkwasea a ɔtena hɔ no." N'adamfoɔ ani gyee hustle no ho. N'abusua de wɔn ani too so.

Nanso akyire no, Kojo na ne mu resa. Ɔnom energy drinks sen sɛ ɔbedi aduan pa. Ɔgye adwuma calls anadwo mfinimfini. Ɔbo fu passengers ho, ɔne ne nuanom nketewa gye akyinnyeɛ, na wankae bere a ɔserewee paa a ɔmhyɛɛ ne ho so no bio.

Ɔkaa daa sɛ, "Momma menhyɛ so asram asia bio." Asram asia no danee afe. Ne nipadua na edi kan bɔɔ no kɔkɔɔ — tirim yaw, mmati mu den, yafunu yaw. Ɛnna n'adwene nso dii akyi. Bere a ɔgyina traffic lights no, na ɔte ne ho sɛ ne mu ada, sɛnea ɛbɛyɛ a ɔde ne ho bi agya akyire hɔ.

Nyanbaeɛ no baeɛ bere a ɔwerɛ firii delivery route a na wadi so bosome pii no mu. Ɔde kar no gyinaa dua bi ase wɔ Dzorwulu na ɔtenaa hɔ komm. Mmom sɛ ɔbɛsɔre engine no bio no, ɔfrɛɛ ne yɔnko Malik kae sɛ, "Bro, me te sɛ m'adu awieeɛ."

Malik anyɛ no aniwuo. Ɔboaa Kojo ma ɔne ne supervisor kasaeɛ ma wɔtew shift baako so. Kojo gyaee weekend driving kakra. Ɔhyɛɛ aseɛ buu aduan pa baako ne anadwo komm baako sɛ nneɛma a ɛho hia. Na sika da so yɛ ketewa, nanso na ne koko mu nte sɛ ɔsoa boɔ da biara bio.

Kojo kaeɛ akyire yi sɛ, "Na medwene sɛ ahomegyeɛ yɛ ade ma asikani nkutoo. Afei nim sɛ burnout tumi ma mmarima a wɔyɛ den mpo hwe fam."

Sɛ wo hustle no adane nkwa-nhyehyɛeɛ a ahomegyeɛ biara nni mu a, ebia bere adu sɛ wobɛsesa pace no ansa na wo nipadua asesa ama wo.`,
    },
  },
  {
    id: "akosua-caregiver",
    title: {
      en: "Akosua and the caregiver weight",
      tw: "Akosua ne hwɛfoɔ adesoa no",
    },
    summary: {
      en: "Caring for her sick father made Akosua look strong to everyone else, but inside she was disappearing.",
      tw: "Sɛnea Akosua hwɛɛ ne papa yareɛ no maa obiara huu no sɛ ɔyɛ den, nanso ne mu no na ɔreyera.",
    },
    readTimeMinutes: 5,
    body: {
      en: `When Akosua's father had a stroke in Kumasi, life rearranged itself overnight. Her two brothers sent money when they could, but she was the one bathing him, taking him to physiotherapy, buying medicines, and sleeping lightly in case he called her name at dawn.

At first she felt proud to do it. "This is my duty," she told everyone. And it was. But duty became isolation. She stopped attending choir rehearsal. She delayed her dressmaking jobs. She hardly answered calls unless they were from the pharmacy or hospital.

People praised her constantly. "You are a good daughter." "God will reward you." She appreciated the kindness, but some nights she wanted to scream. Nobody asked if she was afraid. Nobody asked how tired she was. They only thanked her for enduring.

The breaking point came after she missed a small client payment because she was at the hospital. She sat in the trotro home and cried quietly into her face mask. An older woman beside her touched her arm and said, "My daughter, who is caring for the one who is caring for everyone?"

That question followed her home. The next week she finally told her auntie she needed help. They created a rota. One cousin took Saturday afternoons. A church sister stayed with her father during physiotherapy visits. Akosua was still a caregiver, but she was no longer carrying the whole house alone.

"I learned that love can be shared," she said. "If I collapse, I can't help anybody."

If you are looking after someone who is ill, remember: your rest is not selfish. It is part of the care.`,
      tw: `Bere a stroke bɔɔ Akosua papa wɔ Kumasi no, nkwa sesaeɛ anadwo baako pɛ. Ne nuanom mmarima baanu no somaa sika bere a wɔtumi, nanso Akosua na ɔde no guare, ɔde no kɔ physiotherapy, ɔtɔ nnuro, na ɔda brɛoo sɛnea ɛbɛyɛ a sɛ ɔfrɛ ne din anɔpahema a obetie.

Mfiaseɛ no, n'ani gyee ho sɛ ɔreyɛ saa. Ɔka kyerɛɛ obiara sɛ, "Yei yɛ m'asɛdeɛ." Saa nso na ɛte. Nanso asɛdeɛ no danee ankonam. Ɔgyaee choir rehearsal. Ɔmaa ne dressmaking adwuma kyerɛe. Ɔntaa mmua calls bio gye sɛ ɛfiri pharmacy anaa hospital.

Nnipa yii no ayɛ daa. "Woyɛ ɔbaa pa." "Onyame betua wo ka." Na ɔda aseɛ ma wɔn yam pa no, nanso anadwo bi ɔpɛe sɛ ɔteɛm. Obiara anbisa sɛ ɔsuro anaa. Obiara anbisa sɛ ɔabrɛ dɛn. Wɔdaa no aseɛ sɛ ɔregyina mu nko.

Nyanbaeɛ no baeɛ bere a ɔhweree client payment ketewa bi efisɛ na ɔwɔ hospital. Ɔtenaa trotro mu resan fie na ɔsuiɛ komm wɔ ne face mask mu. Ɔbaa panyin bi a ɔte ne nkyɛn no kaa ne nsa so kae sɛ, "Me ba, hena na ɔrehwɛ nea ɔrehwɛ obiara no?"

Saa asɛmmisa no dii n'akyi kɔɔ fie. Nnawɔtwe a edi hɔ no, ɔka kyerɛɛ ne sewaa sɛ ɔhia mmoa. Wɔyɛɛ rota. Cousin bi gyee Memeneda awia. Asɔre nuabaa bi tenaa ne papa nkyɛn bere a ɔde no kɔ physiotherapy no. Na Akosua da so yɛ ɔhwɛfoɔ, nanso na ɔnsoa efie no nyinaa nko bio.

Ɔkaeɛ sɛ, "Mesuaa sɛ ɔdɔ no betumi akyere nnipa pii. Sɛ mehwe fam a, merentumi ammoa obiara."

Sɛ wohwɛ obi a ɔyare a, kae: wo ahomegyeɛ nyɛ pɛsɛmenkominya. Ɛyɛ hwɛ no fã.`,
    },
  },
  {
    id: "selorm-social-media",
    title: {
      en: "Selorm and the social media pressure",
      tw: "Selorm ne social media pressure",
    },
    summary: {
      en: "The more Selorm scrolled, the more he felt like everyone else had figured life out except him.",
      tw: "Bere a Selorm hwɛɛ social media kɛseɛ no, na ɔte sɛ obiara ahu nkwa kwan agya ne nko.",
    },
    readTimeMinutes: 4,
    body: {
      en: `Selorm's mornings started with his phone. Before brushing his teeth, he had already seen three engagement shoots, two visa announcements, a classmate's new car, and one "soft life" reel filmed in Dubai.

By 8 a.m. he would already feel behind.

He worked in a small design studio in Accra and was doing his best, but online it looked like everybody his age had already "blown." Some had launched brands. Some had relocated. Some were posting polished pictures with captions about discipline and favour. Selorm began to feel ashamed of his ordinary life.

The strange thing was that scrolling never inspired him for long. It left him restless. He stopped celebrating his own progress. Even when he finished a project, he only thought about people doing bigger things.

One Sunday his cousin took his phone during lunch and laughed: "You are drinking pressure for breakfast every day." They both laughed, but the words stayed with him.

Selorm started making small changes. He muted accounts that made him spiral. He kept the ones that taught design skills and the friends who posted honestly. He stopped sleeping with his phone beside his pillow. Slowly his mind became quieter. His life had not suddenly become perfect, but it started to feel like it belonged to him again.

"I didn't need a new life," he said. "I needed less noise around the life I already had."

If social media is making you despise your own pace, it may be time to protect your mind before you protect your image.`,
      tw: `Selorm anɔpa no fi aseɛ wɔ ne phone so. Ansa na ɔbɛpopa ne se no, na wahwɛ engagement shoots mmiɛnsa, visa announcements mmienu, ne sukuu yɔnko bi kar foforɔ, ne "soft life" reel baako a wɔyɛɛ wɔ Dubai.

Anɔpa 8 bɛyɛ no, na ɔte dedaw sɛ woaka akyi.

Ɔyɛɛ adwuma wɔ design studio ketewa bi mu wɔ Accra na na ɔrebɔ mmɔden, nanso online no na ɛte sɛ ne mfefoɔ nyinaa "ablow." Bi ahyɛ brand ase. Bi atu akɔ. Bi de mfonini a wɔasiesie no pa ara ato so a captions ka discipline ne favour ho. Selorm hyɛɛ aseɛ tee aniwuo wɔ ne nkwa a ɛyɛ daa no ho.

Adeɛ a ɛyɛ nwanwa no ne sɛ, scrolling no anhyɛ no nkuran kyɛ. Mmom ɛmaa ne ho yɛɛ no basaa. Ɔgyaee sɛ ɔbɛdi n'ankasa nkɔsoɔ ho ahurisie. Mpo sɛ ɔwie project bi a, na ɔdwene nnipa a wɔreyɛ nneɛma akɛseɛ sene saa no ho nko.

Kwesida bi ne cousin gyee ne phone firii ne nsam bere a wɔredidi awia no na ɔseree kae sɛ, "Da biara wode pressure na edidi anɔpa." Wɔnyinaa seree, nanso saa nsɛm no kaa ne tirim.

Selorm hyɛɛ aseɛ yɛɛ nsakraeɛ nketenkete. Ɔmutee accounts a ɛma ne ho twa no. Ɔde nea ɛkyerɛ design skills ne nnamfo a wɔde nokorɛ to gu no pɛ na ɔkuraa. Ɔgyaee sɛ ɔde ne phone bɛda ne kɔn ho. Brɛoo, n'adwene yɛɛ komm. Ne nkwa anyɛ perfect mpofirim, nanso ɛhyɛɛ aseɛ tee sɛ ɛyɛ ne dea bio.

Ɔkaeɛ sɛ, "Na menhia nkwa foforɔ. Na mehia dedeɛ kakra fa nkwa a mewɔ dedaw no ho."

Sɛ social media ma wokyi wo pace no a, ebia bere adu sɛ wobɛbɔ wo adwene ho ban ansa na woadwene image ho.`,
    },
  },
];
