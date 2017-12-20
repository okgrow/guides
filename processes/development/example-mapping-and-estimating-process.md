# Discovery Week Example Mapping and Estimation Process

## Background

Become familar with the *Example Mapping* process.  These are links to documents in the shared *Library* folder in the OKGROW Google Drive. (If you have trouble accessing it any of the docs or links in this guide, request access from Paul or Tony).

##### Required reading and viewing

- [Original example mapping article (PDF)](https://drive.google.com/a/okgrow.com/file/d/12I8KwqgWZXUY6C9zXyTKxGpH3xDp6EtE/view?usp=sharing)
- [Agile Estimating - Mike Cohn (Video)](https://www.youtube.com/watch?v=37zfyncCpkA)

##### Strongly recommended

- Short book (80 pages):  [*Discovery: Explore Behaviour Using Examples*](https://drive.google.com/a/okgrow.com/file/d/1MRTXD-I8GME4Cp6RzRAubMt8U-emfL63/view?usp=sharing)

- Chapter 6 from Agile Estimating and Planning (12 pages): [Estimating Techniques](https://drive.google.com/a/okgrow.com/file/d/10IsJMmfMythKIUj_wBG-rZz0KT44IHwF/view?usp=sharing)

  ​

## Inputs / Starting resources

- ##### Storymap

  - Use [StoriesOnBoard](https://okg-grow.storiesonboard.com)
  - [Sample story map (MiOrder)](https://ok-grow.storiesonboard.com/m/storymap-sample-miorder) 

- ##### Trello Board sync'ed to StoriesOnBoard storymap

  - StoriesOnBoard doc: [Setting Up Sync with Trello](http://blog.storiesonboard.com/setting_up_synchronization_with_trello/)


- ##### Google Drive Example Map File

  - [Sample Example Map file (MiOrder)](https://docs.google.com/a/okgrow.com/spreadsheets/d/1Wf4jsJFz3IiIV2KpTFoYGVMShe9lf0V2DhjfObVI9ew/edit?usp=sharing)


- ##### Members of Project Team

  - At least 2 from Dev team
  - Client will be expected to participate, but may not be practical to ask for 5+ hours per day for 1 week

- ##### Scheduled Daily (if possible) Client Discovery Meetings (30 minutes)

- ##### Scheduled Example Mapping Workshops

  - How long?
    - Full day
    - Break up the day into 2 sections: 3hrs each broken by lunch break
  - How many?
    - Depends on length of Discovery Phase.
  - Account for time differences and time zones
  - Break regularly
    - Aim for timeboxed 25-minute example mapping sessions
    - Sessions can be shorter than 25 minutes
    - Take a 5-10 minute Break every 2 sessions or if a session goes longer than 45 minutes.

  ​

## Process

- #### Internal Kickoff

  ##### As a group

  - ##### Walkthrough Storymap

    Gain an understanding of the Project goals, value props.  Good input (if available) is any Design Sprint output.

  - ##### Red-flag Critical / Risky / Ambiguous `Task`-level cards

    - Any cards that are too vague / ambiguous
    - Any cards involving unknown API or partners
    - Any cards that involve a technology that we don't have experience in

  - ##### For each flagged card

    1. Come to a relative order from highest to lowest risk
    2. Determine if the client is required for the Example Mapping session for the card

- #### Example Mapping

  ##### For each `Task`-level card in Storymap (TIMEBOX 25 minutes)

  1. Identify the card, provide context

     - As much as possible, address the riskiest cards as soon as possible
     - Deviate from the risk-priority only if doing a lower-priority card is needed to provide context

  2. Uncover *Rules*, *Examples*, and *questions*

     - List any rules that we know already
     - For each rule, give one or more examples to illustrate it
     - Discuss any missing examples
     - Determine if any new rules are being demonstrated by new examples
     - Capture any questions

     ###### Each card will be different

     - It may be easiest to start with obvious rules, but in some cases you can use examples to discover a rule that's hard to formulate. 
     - It's fine to start with either rules or examples, and going back and forth will help clarify things.

  3. Keep going until the story is clear OR WE RUN OUT OF TIME

  4. At the 25 minute mark, take a thumbs-up or thumbs-down vote on whether the feature is understood well enough to move forward

     > “Whenever a conversation is going around in circles, it’s because you don’t have enough information.  Probably someone is missing from the conversation, or maybe you need to do some user research or a spike. Instead of letting everyone share their opinion about what they think the outcome should be, simply capture the question and move on.”

     Do not wait 25 minutes to call it. As soon as the above behaviour is noted, move on.

     If the card is processed in less than 25 minutes then move on to the next card or on to the break.

  ##### How to handle questions/spikes

  - Capture them on a card (on StoriesOnBoard)
  - Assign someone responsible for finding answers
  - (at the end of each session) Export cards to Trello (using the StoriesOnBoard sync feature)
  - Research and address questions off-line, on card

  ##### How to handle Client participation/involvement in the "BDD" aspect

  - `Task`-level cards that are red-flagged and require Client participation in the Kickoff Process should be earmarked for meetings with client. 
  - Use the standard Example Mapping process with the client involved to reveal rules and examples, resolve initial questions and reveal new ones
  - Identify all questions including those that are the *Client's responsibility* to research and answer. Create question cards as normal

- #### Create `Development` Cards

  ##### For each `Task`-level card and completed Example Map sheet

  - Break the task into 1 or more `Development`-level cards
  - `Development`-level cards are:
    - Smaller but complete chunks of functionality
    - self-contained, *demonstrable*, ***testable***
    - accompanied one or more rules and examples
  - `Development`-level cards will be
    - Estimated using story points
    - Imported from StoriesOnBoard into Trello as work cards
  - Each *Rule* naturally represents a potential way to split the task (ie. success rules vs failure rules)
  - Look for natural seams and groupings in rules and the examples used to represent them, but don't get fixated on `1 rule per Dev card`
  - 1-pager [How to Split a Story](https://drive.google.com/a/okgrow.com/file/d/1azKBvlOEnkA65t__vu_qXXY7b05WgX5b/view?usp=sharing)
  - Good examples
    - Success scenario/happy path VS failure scenario/error paths
    - Simple (most common scenario) VS alternate methods (pay in cash vs credit)
    - Handle potential count preconditions  (a list with 1 vs many vs none) if interesting or complex
  - Bad card examples
    - "Schema Design"
    - "Database Design"
    - "Menu Item UI"
    - "Menu Item Query"

- #### Add Estimates to `Development`-level Cards

  ##### Create a POINTS BASELINE as a group

  - Look through your collection of `dev`cards and agree on an exemplar of a 3-point card
  - Do the same and find 5-point card
  - All other cards are measured *relative* to these 2 cards

  ##### Notes about thinking about cards

  - Each card represents the *full scope of work*
    - GraphQL / API
    - UI implementation / design tweaks
    - Routing
    - Database
    - Testing
    - Done Done
  - *The above does not mean everything gets bumped to next tier*
  - It *does* mean that 1's are *very small* and very likely making changes / additions to existing features
  - ***everything* is relative**, you should be considering *all* the work for *every* card
  - Don't give higher point values on small tasks to be "conservative." That will distort the estimate, giving those tasks too much time relative to other work that needs to be done. Focus only on relative size

  ##### For each remaining `Development`-level card

  - Use [Pointing Poker site](https://www.pointingpoker.com/) to start a Planning Poker session

  - Pick an un-estimated card

  - Quickly Summarize / Review the card

  - Everyone places their points 'bet' 

  - Discuss the discrepancies in assessment and decide on point value or re-vote

  - Assign the points in StoriesOnBoard

  - Include the estimate in the StoriesOnBoard card title

    ​	*"View Profile"*  =>  *"(3) View Profile"*

  ##### True-up if necessary

  - After going through a number of cards, if needed, go back and assess that the points sizes are staying relatively consistent

    > The set of '3s' *are* generally smaller than the set of '5s'

    ​

## Output / Outcomes

- ##### Clarified storymap

  - Over the course of the process, the original `Task`-level storymap will change.  Some Task will be removed or merged into together, some will be 'demoted' into `Development`-level cards

- ##### Estimated `Development`-level cards that

  - Are ready to be ported into Trello
  - Do not contain `Gherkin` syntax, but they will note rules and examples to be extrapolated into `Given, When, Then` structures when development starts
  - Have points-estimates relative to the collection of `Development`-level cards

## Conclusion and Next Steps

By the end of this workflow, you will have a set of `Development`-level cards ready to be pulled off and worked on.

Next steps may be comparison of the time estimated in weeks in the Project Proposal against the points total to derive a 'needed velocity', a renegotiation on scope or budget if needed.

If the project is small and limited scope, then all the cards can probably be exported from StoriesOnBoard to Trello.

for larger projects there will probably be a phased release approach where only the cards in the immediate release are moved over to Trello.
