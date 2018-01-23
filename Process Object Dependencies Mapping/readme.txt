Author: Bartosz Buchcic
IBM Copyright

Description:
Application parse .bprelease file and generate list of Business Objects used in Process. 
Also if .bprelease contains Business Objects generator returns list:
- Inputs,
- Outputs,
- Description,
- Preconditions,
- Postconditions,
of this Business Objects.

How to use it:
- Open index.html file in browser (i.e. Mozilla),
- Click Browse button and select .bprelease file,
- wait untill preview will show up,
- click Export to Excel if you want excel file.


It is extremely easy to use but you have to remember about two conditions:
- use .bprelease file with Process and all Business Objects included in your robot (you don't have to care 
about internal objects like Internal - Work Queues or Utility objects),
- application prepare output basing on Business Object description, input, output etc. NOT PROCESS - this is very important,
