import Sentiment from "sentiment";
let sentiment = new Sentiment();
var options = {
    extras: {
        hansome: -2,
        amazing: 2,
    },
};
const hero = "manik is hansome";
const sentence = "Coronet has the best lines of all day cruisers.";
const sentence2 =
    "The warm rays sweet love of sunshine gently caressed my face as I strolled through the lush, green meadow. The vibrant colors of wildflowers danced in the breeze, filling the air with their sweet fragrance. Birds chirped melodiously, creating a symphony of nature's harmonious melodies. I felt a sense of tranquility and joy wash over me, as if all happy the worries of the world had faded away in that moment. It was a blissful and serene experience that reminded me of the beauty and magic that exists in the simplest of moments.";
const sentence3 =
    "I prefer my mobile but would not suggest it to any of my colleagues";
const sent =
    "Similar premise as Super gene, instead of getting the OP he regresses, Should be interesting and hopefully well written if WW is looking into it, we'll have to see ill hold off on doing a true review not enough data to complain and rave about it ... The chapters though so far of peeked my interest so ill continue with it until I find it falls into standard trope process....pft who am I kidding I will keep reading it to pay homage to the author like I do everything else I start reading.This is Viberaider signing off in hope you enjoy the premise";

const wux1 =
    "For now, I’m going to have to give this a thumbs down. The novel is simply a rip off of Super Gene, but rushed. It’s a copy of Super Gene but with regression. What made Super Gene great was it’s story telling and foreshadowing. This novel is more of a power fantasy for the sake of power fantasy. I don’t see this having much plot beyond being OP. Even his regression is pointless, he was simply not that strong before he regressed. No emotions beyond him being untalented exist. To me, this novel would be better described as a fanfic.";
let result = sentiment.analyze(sent);
console.log(result); // Score: -2, Comparative: -0.666
