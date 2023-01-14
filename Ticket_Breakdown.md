# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:
**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

From my point of view ,as per design, first I'll consider migrating all the agents with custom Ids in an order. On clarifying this with the client.I'll move ahead with the approach. For example if they have 100 agents in their db. Now they want to assign a custom id , we can inject all agents with an id like '23A001' to '23A100' where 23 denotes the year. A-series , 001-denotes the id. if they are ok with this approach. First ticket would be migrating all users with custom id provided by platform.

The reason am referring to this approach is it would be tedious to assign each agent to assign a custom id by entries. Instead we can go by common custom id for each agent.

In the above case, lets say for each facility they want to assign a custom id means, we want to add a new field in agent schema/table called facilityCustomIds as an object that would store {facilityId:customId}. am assuming in the long run they want to use the same custom id for the agent.

## 1. 

  Requirements : Introduce a new field in agent schema and make facility to enter own custom id to an agent while they save/book an agent.

  Implementation Details : 
    1.a) Add a new field in the agent schema called facilityCustomIds as an object. 
    1.b) introduce a new input field in the booking screen so that our facility create their own custom id for each agent.
    1.c) alter handleSave method in FE to add this field in the saved data

Acceptance criteria :  Facility should be able to save/book an agent with their own custom ID and it should be reflected in agents table/schema.

Estimates :  2 points

I am assuming generateReport method would be using getShiftsByFacility for getting all the data. We have to make an edge case fix so that it shouldn't break for old data which is there before the feature of having custom id.
## 2.
  Requirement(s) : fetch custom id in the getShiftByFacility method instead of internal db id and generateReport should have their custom id in their report.

  Implementation details : 
  2.a) 'getShiftByFacility' uses facility id for fetching . So for the agents who are having facilityCustomIds property in their schema/table should be fetched custom id based on their facility id.
  2.b) alter generateReport method so that it will use custom id mapped in the  pdf report.

  Acceptance Criteria : Agents who are having facilityCustomIds in their schema/table should have their custom id fetched. metadata of 'getShiftByFacility' should be evalated for this. PDF report should reflect this change.

  Estimates : 3 points







