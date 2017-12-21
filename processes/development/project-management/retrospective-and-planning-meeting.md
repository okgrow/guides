For each project the project lead runs a weekly retrospective and planning meeting as early as possible on Monday. This is usually for the develoment team only, we have a separate client meeting any time in the week.

1. #### Retrospective

   1. In the "retrospective notes" document for the project list what we’re happy/sad/neutral about with a to-do item to fix each “sad” item if possible
   2. Update iteration tracking spreadsheet (“burn-up chart”)

2. #### Planning

   1. Create a new list named “Done YYYY-MM-DD” for *this week's iteration*.
   2. Plan at least the next week’s worth of stories
      1. Are there new bugs in the *Future List* that need to be addressed? Move them into *This Week*
      2. Are there cards in the *Client Review List* that have comments indicating the feature is not "Done"?  Move them back into *This Week*
      3. Review the *Planned List*. Cards in this list should:
         1. have a points estimate - with the exception of bugs, cards without estimates go into the *Future List* where they can be prioritized and negotiated with the Client
         2. already be in relative business priority and/or logical technical order - the Project Lead should be helping the Client understand the general order of the work
   3. Move cards from the *Planned List* into *This Week* **that the team can commit to delivering**
      1. Taking into account the bugs and rejected 
      2. Adding a “Tasks” checklist to each one and listing all the technical tasks in as much detail as possible (if not already there).
   4. When a group of work is estimated together to be done as a specific phase or sprint then add a green tag to each card so that changes and additions become obvious.
   5. Make sure the client is moving things to “Done”

3. #### Housekeeping

   1. Update the storiesonboard Trello integration

      1. Open the project's storiesonboard storymap

      2. Go to the Trello integration screen

         >  `...` (in header) => `Board settings` => `Issue tracker integration`

      3. In the `Status mappings` section, change the newly added Trello list's mapped status to `done` and click `Save`
