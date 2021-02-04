using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Api.Controllers
{
    public class TestController : ControllerBase
    {
        private IMongoDatabase _database;

        public TestController()
        {
            var client = new MongoClient("TODO");
            var dbList = client.ListDatabases().ToList();

            Console.WriteLine("The list of databases on this server is: ");
            foreach (var db in dbList)
            {
                Console.WriteLine(db);
            }
            
            this._database = client.GetDatabase("pib");
        } 
        
        // GET
        [HttpGet("test")]
        public async Task<IActionResult> GetCollections()
        {
            var a = 1;
            var collection = this._database.GetCollection<TestObject>("Test");
            var documents = await collection.Find(FilterDefinition<TestObject>.Empty).ToListAsync();
            
            return this.Ok(new {
                Documents = documents
            });
        }
        
        // GET
        [HttpPost("test")]
        public async Task<IActionResult> AddItem()
        {
            var collection = this._database.GetCollection<TestObject>("Test");
            
            var document = new TestObject
            {
                TestId = Guid.NewGuid(),
                info = new InnerObject
                {
                    x= 203,
                    y= 102,
                }
            };

            await collection.InsertOneAsync(document);

            return this.Ok(new {
                Message = "Test"
            });
        }

        public class TestObject
        {
            public ObjectId Id { get; set; }
            public Guid TestId { get; set; }
            public InnerObject info { get; set; }
        }

        public class InnerObject
        {
            public int x { get; set; }
            public int y { get; set; }
        }
    }
}