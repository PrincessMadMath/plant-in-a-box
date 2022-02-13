using Microsoft.VisualBasic;

namespace PIB.Infrastructure.Mongo;

public static class MongoUtils
{
    public static string GetCollectionName<T>() where T : MongoDocument
    {
        System.Attribute[] attrs = System.Attribute.GetCustomAttributes(typeof(T));
        
        foreach (System.Attribute attr in attrs)  
        {  
            if (attr is CollectionAttribute collectionAttribute)
            {
                return collectionAttribute.CollectionName;
            }  
        }

        throw new Exception($"Missing {nameof(CollectionAttribute)} attribute.");
    }
}
