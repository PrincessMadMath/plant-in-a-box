using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.BoxData
{
    [Microsoft.AspNetCore.Components.Route("")]
    public class HomeController : ControllerBase
    {
        [HttpGet("")]
        public async Task<OkObjectResult> Index()
        {
            return this.Ok("Welcome to PIB. v2");
        }
    }
}