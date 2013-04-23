using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebPageBackbone.Context;
using WebPageBackbone.Models;

namespace WebPageBackbone.Controllers
{
    public class UserController : ApiController
    {
        private BackboneWorld backWorld = new BackboneWorld();

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public User Get(int id)
        {
            return backWorld.Users.Single(user => user.Id == id);
        }

        // POST api/<controller>
        public int Post([FromBody]User value)
        {
            User newUser = backWorld.Users.Add(value);
            backWorld.SaveChanges();
            return newUser.Id;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]User value)
        {
            User userFromDb = backWorld.Users.Single(user => user.Id == id);
            userFromDb.Age = value.Age;
            userFromDb.Name = value.Name;
            backWorld.SaveChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            backWorld.Users.Remove(backWorld.Users.Single(user => user.Id == id));
            backWorld.SaveChanges();
        }
    }
}