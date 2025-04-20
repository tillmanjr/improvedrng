# If you are overly "sensitive" or easily offended, skip forward to What's here?  
  
Built-in RNG's generally suck. additionally, it is not uncommon to see them improperly used.  
People come along and "improve" them. However, the documentation of improvements is often overly obtuse and or abstract. For one who merely wishes (with some confidence) to implement random generation in their code will quickly  
comes to a choice of two alternatives:       
1. continuing one's attempt to make sense of the arcane blather    OR  
2. having one's choice to continue being forcibly removed from one's consideration and instead spending the time being bitch to a herd of drunk bull elephants who just escaped Pfizer where they each downed a crate -or more- of Viagra   
Given the two alternatives, one will take understandably take solace in knowing they'll never be constipated again.  
  
__So, what am I doing writing documentation?__     
Attempting to save Elephant Pride, of course.  
Elephants sober up eventually and there are few sadder sights than a hungover bull elephant suffering from post-coital guilt.   
   
# What's here?  
At a high level this code uses random-js to wrap a number of RNG Engines providing a consistent interface (very close anyways) regardless of engine selected.  
This makes doing some comparisons a lot easier.  Although it mostly unfuc -er I mean fixes some of them.  
  
## Engines:  
### Native  
#### Math.Random and its ilk.  AKA normally pretty biased and improperly used  
### Cryptographic Engines  
#### Browser Native - no two browser implement the "standard" api consistently, though they are a big improvement over native - assuming your browser supports it.  
#### Node Crypto - native NodeJS cryptographic implementation, works pretty well, but must have nodejs (which this tool requires LOL)  
### Other 
#### MersenneTwister19937 - there are some seed requirements (not difficult just do them) and generally works decently  
  
## Before I continue, some gospel   
Create one and only one instance of an engine per instance of whatever is executing it. Don't create multiple instance of an engine in a single application. One per instance.  
So, if you scale you application by running three horizontal instances you should create a sum total of three instances of a random engine, one in each application instance.  
Amen!  
  
## Just to be clear here, this is all about DnD and similar so ...    
#### We'll base our intitial work on D20 rolls.  
  
## An easy start, or is it really that bad?:  
  
Install packages (`random-js`)   
* `npm install`   or
* `yarn`

Open `./simplistic/index.js`  
Change the values as desired  
```
const runParams = {
    n: 1000,   // number of D20s to roll for each set of rolls (a bin)
    y: 1000,   // number of D20 sets (bins) to roll 
    include: { // available randomization engines, true = enable, false = disable
        mersenneTwister: true,  // use Mersenne Twister randomization?
        nativeMath: true,       // use JavaScripts native Math random function?
        nodeCrypto: true,       // use nodejs's Crypt getRandomBytes?
        vanilla: true           // use vanilla JavaScript Math.random?
    }
}
```
Save `./simplistic/index.js`  
Run  `./simplistic/index.js`  
_e.g._ `node ./simplistic/index.js`


### Internal 
#### RNG Engines:
* random-js's Mersenne Twister (using Mersenne Primes to seed)  
* random-js's Node.js's built-in Crypto library  
* random-js's wrapping and improving Javascript's native Math.random  
* Javascript's vanilla Math.random  

`node-js` provides a consistent API for the following randomization engines used here:      
* Mersenne Twister functionality  (`mersenneTwister`)
* an improved version of JavaScript's native Math.random (`nativeMath`)
* simple function access to nodejs's Crypto.getRandomBytes (`nodeCrypto`)
  

For each enabled RNG engine:    
1. Run `n` D20 rolls `<engine>.random.integer(1, 20)`     
2. Bin the roll totals by die face (1,2,3...20)  
3. Repeat the preceding `y` times accumulating the binned results  
4. Print the results  
5. __Yes, I am potentially smoothing out the results with this approach__  

### Initial Values   
```
N = 1000  
Y = 1000
```    
_If perfectly even distribution then values would each be: `(n * n / 20)`_   
  
### and results  
Vanilla Javascript's Math.random()
`./simplistic/randomFunctions/vanilla.js`  
```
Vanilla JS Math.random()
Roll 1000 sets of 1000 D20
Min: 49572    Max: 50415		Standard Deviation
     -428         +415			216.32128882752156

Face	Count
 1		49572 <-- Min
 2		49681
 3		49822
 4		49866
 5		49847
 6		50113
 7		49954
 8		50184
 9		49641
10		50161
11		50272
12		50072
13		49879
14		50182
15		50195
16		50009
17		49904
18		50415 <------- Max
19		50140
20		50091
```

Using the random-js implementation of a Mersenne Twister
`./simplistic/randomFunctions/mt.js`  
```
Mersenne Twister 19937 with random-js
Roll 1000 sets of 1000 D20
Min: 49706    Max: 50224		Standard Deviation
     -294         +224			177.92357910069143

Face	Count
 1		49706 <-- Min
 2		50021
 3		50224 <------- Max
 4		50081
 5		50184
 6		49729
 7		50148
 8		50203
 9		49943
10		49754
11		49946
12		50169
13		50032
14		49834
15		50122
16		49913
17		49761
18		49822
19		50184
20		50224 <------- Max
```


Using the random-js wrapper engine of NodeJS's native crypto library  
`./simplistic/randomFunctions/nodeCrypto.js`  
```
Node Crypto RNG with random-js
Roll 1000 sets of 1000 D20
Min: 49707    Max: 50255		Standard Deviation
     -293         +255			126.97991967236395

Face	Count
 1		49991
 2		49860
 3		50255 <------- Max
 4		49951
 5		49990
 6		50109
 7		50169
 8		49841
 9		49981
10		49894
11		49894
12		49969
13		49943
14		49997
15		49707 <-- Min
16		50086
17		49981
18		50123
19		50140
20		50119
```
  
Using the random-js wrapper engine of Javascript's Math.random function which includes improvements   
`./simplistic/randomFunctions/nativeMath.js`  
```
Native Math.random with random-js
Roll 1000 sets of 1000 D20
Min: 49780    Max: 50329		Standard Deviation
     -220         +329			148.07295499178775

Face	Count
 1		49846
 2		49879
 3		49780 <-- Min
 4		49813
 5		50080
 6		50052
 7		50329 <------- Max
 8		50262
 9		50061
10		49999
11		50109
12		50066
13		49923
14		49913
15		50009
16		49828
17		49888
18		49983
19		49951
20		50229
```
  
## Simplistic Summary - first pass  
```  
RNG Enging                          Min         Max:        Min-  Min+  Standard Dev.  
----------------------------------------------------------------------------------------------  
Vanilla JS Math.random()            49572       50415		-428  +415  216.32128882752156  
  
Mersenne Twister 19937              49706       50224       -294  +224  177.92357910069143  
  
Node Crypto RNG                     49707       50255       -293  +255  126.97991967236395  
  
Improved JS Math.random()           49780       50329       -220  +329  148.07295499178775  
```
  
Vanilla Javascript's Math.random() appears significantly inferior to the other RNGs although random-js's improve it significantly.  
This doesn't indicate what specific biases, if any, the engines have, and may also mask run to run stability issues.   

Next I will perform the same test 10 times per engine only collecting the summary information  - to look at run to run stability.
Then we'll do something similar to look for range bias.   
