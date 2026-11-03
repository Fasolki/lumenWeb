/*
 * ECHO — Room Tone
 * All the words on the page live here. The page reads this file; nothing in
 * echo.js needs editing to add songs or the video.
 */

/*
 * ---------------------------------------------------------------------------
 *  MEDIA SLOTS — fill these in when the files exist
 * ---------------------------------------------------------------------------
 *
 *  Songs: drop the MP3s into public/lab/echo/audio/ and put the file name next
 *  to the track number, e.g.  1: 'audio/01-main-room.mp3'
 *  A track left as null shows a quiet "coming soon" player instead.
 *
 *  Music video: set ONE of
 *    youtubeId: 'dQw4w9WgXcQ'          (the id from the YouTube link), or
 *    file: 'video/hallway-lights.mp4'  (a file in public/lab/echo/video/)
 *  Leave both null and the section shows the poster with "Premiering soon".
 */
window.ECHO_MEDIA = {
  audio: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  },
  video: {
    title: 'Hallway Lights',
    caption: 'Official music video — second single from Room Tone',
    youtubeId: null,
    file: null,
    poster: 'img/hallway-lights.webp',
  },
}

window.ECHO_ACTS = [
  { id: 'high', numeral: 'I', name: 'The High', range: [1, 3], line: 'The packed room, the buzz, the full-volume anthems.' },
  { id: 'fade', numeral: 'II', name: 'The Fade', range: [4, 6], line: 'People leave, ears ring, doubts creep in.' },
  { id: 'quiet', numeral: 'III', name: 'The Quiet', range: [7, 8], line: 'The empty stage, the bedroom floor.' },
  { id: 'echo', numeral: 'IV', name: 'The Echo', range: [9, 10], line: 'What remains, and the sound of the room itself.' },
]

window.ECHO_TRACKS = [
  {
    n: 1,
    title: 'Main Room',
    role: 'Opener / anthem',
    about: 'The album starts at the peak, with the crowd at full volume and the biggest hook first.',
    lyrics: `[Intro]
(ball bouncing, bass thump, crowd noise)
Hey, oh, hey, oh

[Verse 1]
Lights hit and the whole floor jumps
Bassline rattling through the cups
Every voice in here is locked on one beat
No one's looking at the clock on the wall

[Pre-Chorus]
Hold it, hold it, hold it right there
Hands up now, let it hang in the air

[Chorus]
We're in the main room, tell the whole place
Turn it up till the roof can't hold its face
Every flash, every name
Nothing after this is ever the same
Oh-oh-oh, in the main room

[Verse 2]
Started with a ball on a dead gym floor
Now the sub's hitting right through the doors
We were small, now the whole place leans
All that space and we're stealing the scene

[Chorus]
We're in the main room, tell the whole place
Turn it up till the roof can't hold its face
Every flash, every name
Nothing after this is ever the same

[Bridge]
Oh-oh, whoa-oh
Keep it rolling, don't let go
Oh-oh, whoa-oh
Right here is where the speakers blow

[Final Chorus]
We're in the main room, we're in the main room
Drop hits hard and the whole room moves
Oh-oh-oh, in the main room
Nothing after this is ever the same`,
  },
  {
    n: 2,
    title: 'Changing Room',
    role: 'Lead single',
    about: 'Who you become under the lights, and the most radio-friendly chorus on the record.',
    art: 'img/changing-room.webp',
    lyrics: `[Verse 1]
Strip lights hum above the mirror
Reflection staring, getting clearer
Same old shirt, same worn-out jeans
Just a ghost of who I've been

[Pre-Chorus]
Heartbeat thumpin', kinda loud now
Gotta shake this feeling somehow

[Chorus]
This is where the old me stays
Hanging on a hook, through these changing days
Stepping out, new skin, new sound
Ready for the lights, ready for the crowd

[Verse 2]
Hear the bass drum, feel the floor shake
Little shiver, I'm wide awake
Just a breath, a final look back
No turning now, I'm on the right track

[Pre-Chorus]
Heartbeat thumpin', kinda loud now
Gotta shake this feeling somehow

[Chorus]
This is where the old me stays
Hanging on a hook, through these changing days
Stepping out, new skin, new sound
Ready for the lights, ready for the crowd

[Bridge]
Every fiber, every thread
Leaving worries in my head
This is it, no more delay
Gonna own this moment, here to stay

[Chorus]
This is where the old me stays
Hanging on a hook, through these changing days
Stepping out, new skin, new sound
Ready for the lights, ready for the crowd`,
  },
  {
    n: 3,
    title: 'Green Room',
    role: 'Banger',
    about: "The buzz that won't switch off after the show.",
    lyrics: `[Verse 1]
Fluorescent buzz, cheap mirror glare
Sweat in my collar, confetti in my hair
Towel on the bench but I can't sit down
Ears still ringing from the sound

[Pre-Chorus]
Hands won't settle, heart won't slow
The show is over but I can't let go

[Chorus]
Can't come down, can't come down
The whole room's still spinning round
Green room, nobody's leaving
Dancing on the couch, still believing
Can't come down, can't come down

[Verse 2]
Floorboards shake from the room next door
Someone's chanting for one more
We're out of songs but we're not out of fire
Every voice in here is still wired

[Pre-Chorus]
Hands won't settle, heart won't slow
The show is over but I can't let go

[Chorus]
Can't come down, can't come down
The whole room's still spinning round
Green room, nobody's leaving
Dancing on the couch, still believing
Can't come down, can't come down

[Bridge]
Sweat on the ceiling, glitter on the floor
One more chorus, then we'll close the door

[Final Chorus]
Can't come down, can't come down
Green room, nobody's going home`,
  },
  {
    n: 4,
    title: 'Stairwell',
    role: 'Interlude',
    about: 'A short, vocals-only breath where the first layers drop away.',
    lyrics: `[Interlude]
One step down, then the hall goes soft
Door slams fade to a low hum above
Hand on the rail, taking it slow
Let the stairwell keep what I won't hold

[Interlude]
Breath in
Breath out
The walls hold the tail of it now
Breath in
Breath out
I'm gone by the time it settles down`,
  },
  {
    n: 5,
    title: 'Hallway Lights',
    role: 'Second single / comedown',
    about: 'Walking out with ringing ears and a quiet glow.',
    art: 'img/hallway-lights.webp',
    lyrics: `[Verse 1]
We file out slow past the merch table
My ears still hiss from the kick drum
Someone's laughing by the loading dock
I'm trying not to let the whole thing go
The hallway's lit like a cheap motel
Half-buzzing, half asleep
Your hand still warm around my sleeve
Like you forgot to leave it there on purpose

[Pre-Chorus]
And the bass is still in my ribs
Like a second set of footsteps
The room behind us gets smaller
The further down we drift

[Chorus]
Keep me in the hallway lights
Where the night is going quiet
Where we can hear our shoes on tile
And nobody asks us why
Hold me in the afterglow
Till the lobby doors slide open
Till the siren in my ears lets go
And we can breathe outside

[Verse 2]
You check your phone under the EXIT sign
Say the cab's two minutes away
Your mascara's got a little smudge
You laugh like it's no big thing anyway
I got confetti in my jacket
And a setlist folded wrong
We talk about the opener
Like we're trying to keep the whole room on

[Pre-Chorus]
But the bass is still in my ribs
And the hum still follows us
The night keeps blinking in the glass
Like it's not done with us

[Chorus]
Keep me in the hallway lights
Where the night is going quiet
Where we can hear our shoes on tile
And nobody asks us why
Hold me in the afterglow
Till the lobby doors slide open
Till the siren in my ears lets go
And we can breathe outside

[Bridge]
Some nights don't need a big goodbye
Just the flicker on the wall
Your shoulder bumping mine by half
The way the whole place feels small
We were loud in there for hours
Now we're soft on the way out
With the song still in the air
And a little bit of it on our mouths

[Final Chorus]
Keep me in the hallway lights
Let the morning take its time
With the static still behind my eyes
And your laugh still on my mind
Hold me in the afterglow
Till the last of it is fading
We don't have to say we loved it
We can just keep walking

[Outro]
Hallway lights
Flickering low
We don't need the words
We already know`,
  },
  {
    n: 6,
    title: 'Waiting Room',
    role: 'Mid-tempo',
    about: 'Waiting to find out if any of it meant something.',
    lyrics: `[Verse 1]
I left my name on the clipboard by the door
Phone face down, like that could make it less real
You said "I'll text you," then you were gone
Now the vending machine hums like it's in on the deal
I ran the last minute back in my head
Every laugh, every pause, every look at the floor
The room kept breathing through the vents
I kept acting like I wasn't keeping score

[Pre-Chorus]
I count the tile seams, I check the glass
I keep hearing my own voice ask

[Chorus]
Did it mean anything
Or did I build it out of the air?
I'm still here in this plastic chair
Acting cool when I'm not even close
If the room heard us, it hasn't said
But I'm not ready to let it go
Did it mean anything
Tell me slow

[Verse 2]
Your jacket's still a shape on the back of my seat
And my thumb keeps waking the phone again
No missed call, no new message, just the clock
Dragging its shoes down the hall by ten
The woman at the desk won't meet my eyes
The TV's on mute, playing nothing I know
I keep replaying the way you leaned in
Like maybe you were about to say so

[Pre-Chorus]
I watch the door like it owes me proof
Like one small sign could cut right through

[Chorus]
Did it mean anything
Or did I build it out of the air?
I'm still here in this plastic chair
Acting cool when I'm not even close
If the room heard us, it hasn't said
But I'm not ready to let it go
Did it mean anything
Tell me slow

[Bridge]
Then a voice from the hall cuts in
Half a verse, half a prayer
Somebody's singing through the wall
Not strong, but still there
It catches on the pipes, on the cheap white paint
On the door that keeps swinging loose
And for a second I swear I hear
The part of you I couldn't lose

[Final Chorus]
Did it mean anything
Or was I just talking to the air?
I'm still here in this plastic chair
Hands cold, but I'm still holding on
That little voice in the hall
Says I'm not the only one
Did it mean anything
Maybe yes
Maybe it does`,
  },
  {
    n: 7,
    title: 'Empty Stage',
    role: 'Ballad',
    about: 'Everyone has gone home and the stage is bare.',
    lyrics: `[Verse 1]
The house is gone, the last coat's out the door
Cables curled like snakes across the floor
Spotlight dead, but the air still holds the heat
I stand alone where the applause used to meet me
The set list's folded up inside my case
And I can still hear boots crossing the place

[Chorus]
I sing one line into the dark
And it comes back soft, from way off
Not a crowd, just the room and my own breath
Still, I hear enough to keep me here
It's thin, but it hangs on
Like a thread I can't quite let go of

[Verse 2]
The mic stand leans like it's tired too
Dust on the wedge, blue tape torn in two
I almost pack it up and call it done
Then the echo reaches out and holds my tongue
There's coffee gone cold on a case by the wing
And a dimmer switch I never got to bring down

[Chorus]
I sing one line into the dark
And it comes back soft, from way off
Not a crowd, just the room and my own breath
Still, I hear enough to keep me here
It's thin, but it hangs on
Like a thread I can't quite let go of

[Outro]
So I leave the light switch where it is
And sing for the chairs that no one missed
One small note, hanging in the air
Not empty now
Not quite empty there
Till the last sound fades, I'm still here`,
  },
  {
    n: 8,
    title: 'Bedroom Floor',
    role: 'Stripped-back',
    about: 'Back where it all began, alone with the doubts — but changed.',
    lyrics: `[Verse 1]
Back in the room where the paint still peels
Same old boards, same loose deal
I sit on the floor with my cheap guitar
Cable curled up by the bedframe bar

[Pre-Chorus]
And the doubts come back, but I know their names
Too late, not enough, and the one that never stays
They don't sound big in this low lamp glow
They just sit there while I count the chords I know

[Chorus]
On the bedroom floor
I'm not who I was before
Smaller now, but I can hear it more
Every crack in the voice, every string I tore
On the bedroom floor

[Verse 2]
There's a mark on the wall from a poster nail
And a glass on the sill that's gone thin and pale
I laughed too loud, I shut the door
Now I'm learning what the quiet's for

[Pre-Chorus]
And the doubts come back, but I know their names
Too late, not enough, and the one that never stays
They don't run the room like they used to do
Just a few old ghosts with nothing new

[Chorus]
On the bedroom floor
I'm not who I was before
Smaller now, but I can hear it more
Every crack in the voice, every string I tore
On the bedroom floor

[Bridge]
If this is where it started
Then maybe that's okay
I don't need to be the loudest thing
Just here when the song gives way

[Chorus]
On the bedroom floor
I'm not who I was before
Smaller now, but I can hear it more
And the fear's got a name, it doesn't rule the floor
On the bedroom floor`,
  },
  {
    n: 9,
    title: 'Echo',
    role: 'Emotional climax',
    about: "One last chorus built from the crowd's voice replayed as a reverb tail — about what we leave behind.",
    lyrics: `[Verse 1]
I spoke your name to the rafters
It came back small, then clear
My breath on the paint and the plaster
Still hanging in the air

[Pre-Chorus]
And every step I take away
Leaves an echo in the hallway

[Chorus]
The room remembers
The room remembers
Every word, every crack in the floor
The room remembers
The room remembers
Even when I'm not here anymore
Say it once, and it stays
Soft but whole in the same old place

[Verse 2]
The chairs all turned toward nothing
Like they knew you'd been here too
I touched the mic stand, cold metal
It still felt warm of you

[Pre-Chorus]
And every silence that I made
Built a shape in the fade

[Chorus]
The room remembers
The room remembers
Every word, every crack in the floor
The room remembers
The room remembers
Even when I'm not here anymore
Say it once, and it stays
Soft but whole in the same old place

[Bridge]
If I call out, call out
Will you hear it break and bend?
If I let go, let go
Will it find me back again?
(voices fade)
The room remembers...
The room remembers...

[Final Chorus]
Echo, echo
The room remembers
The room remembers
We were here, and it still knows our names
The room remembers
The room remembers
Long after the bodies and the bass
Say it once, and it stays
Soft but whole in the same old place

[Outro]
Echo
The room remembers
The room remembers`,
  },
  {
    n: 10,
    title: 'Room Tone',
    role: 'Closer',
    about: 'Almost nothing but the hum of an empty room, and the last echo of the first chorus fading out.',
    lyrics: `[Whispered]
Room looks too wide after they go.
The fridge keeps thrumming
like it missed the door.
A basketball drifts once across the floor
and parks by the baseboard.
The lamp is still on
by the couch, throwing one yellow patch.
My mug leaves a ring
on the table nobody moved.
And the chorus we were singing
comes back through the walls, half-bent,
then thins out
into room tone.
The kind that hangs there
after a laugh, after shoes in the hall,
after the last hand on the latch.`,
  },
]
