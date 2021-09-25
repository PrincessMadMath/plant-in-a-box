1. Fake API

In app seems easy, quick and allow strong typing for the fake data. But it prevent easily testing networking scenario.


2. React Query

https://betterprogramming.pub/7-tips-for-using-react-query-in-large-projects-22ccc49d61c2

* Enum for ServerStateKeys
* Wrap in custom hooks
** Include mutation and side effect (like toast) (but allow to pass Options in args)
* Group by domain
* By default cached data is consider as stale (can configure staleTime globally)

