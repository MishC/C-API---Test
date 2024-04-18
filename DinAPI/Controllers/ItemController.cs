using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("[controller]")]
public class ItemController : ControllerBase 
{
    private static List<Item> items = new List<Item>
    {
        new Item { Id = 1, Name = "Item1", Description = "whatever" },
        new Item { Id = 2, Name = "TV", Description = "OLED" },
        new Item { Id = 3, Name = "Washing Machine", Description = "A++" },
        new Item { Id = 4, Name = "Computer", Description = "Laptop, MacBook Pro" }



    };

    [HttpGet] // This attribute specifies that this method should handle GET requests
   //[Route("GetItems")] // This specifies the route for this method
    public IEnumerable<Item> Get()
    {
        System.Console.WriteLine(items);
        return items;
    }
     [HttpGet("{id}")]

     public ActionResult<Item> GetById(int id){
      var item=    items.FirstOrDefault(it=>it.Id==id);
     if (item==null)
     {return NotFound();}
     return item;
     }

     [HttpPost]
     public ActionResult Post(Item item) {
        items.Add(item);
        return CreatedAtAction(nameof(Get), new{id=item.Id},item);
     }
     [HttpPut("{id}")]
     public IActionResult PutById(Item item, int id)
     {
        var index=items.FindIndex(it=>it.Id==id);
        if (id==-1){return NotFound();}
         items[index]=item;   
         return NoContent(); 
     }
     [HttpDelete("{id}")]
     public IActionResult DeleteById(int id)
     {
        var index=items.FirstOrDefault(it=>it.Id==id);
        if (id==-1){return NotFound();};
        if (index==null){return NotFound();};
        items.Remove(index);
        return NoContent();

     }

}
