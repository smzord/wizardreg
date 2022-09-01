@RestResource(urlMapping='/welinkRegistration')
global without sharing class WeLinkRegistrationController {
    public static String ACCESS_TOKEN = 'access-token';
    public static String VALIDATE_ADDRESS = 'validate-address';
    public static String CREATE_LEAD = 'create-lead';
    public static String CREATE_SUBSCRIPTION = 'create-subscription';
    public static string client_Id = '3MVG9cb9UNjJbdEy2IcbNFd3NibNrmZEAoGqES0K_22lCmCqMermMrtNP0iZrQImnO_qCpb0wqMtPbn42uXAa';
    public static string client_secret = '23471F42E5A54D5535C3BDA7B40164A36BC2A3AD33D2E0C0AAF52CB01E2107B3';
    public static string username1 = 'sandeep.singhal@zordial.com.welink.partial';
    public static string password1 = 'Zordial#123muxnfOMAmXuno01xVQL7nbFV';
    
    @HttpPost
    global static void doPost(){
        RestRequest reqst = RestContext.request;//Map 
        RestResponse respo = Restcontext.response;
        Map<String, Object> responseRet = new Map<String, Object>();
        if(reqst.params.containsKey('action')){
            String action = reqst.params.get('action');
            System.debug('---action---'+action);
            if(action == ACCESS_TOKEN){
                String token = getAccessToken();
                responseRet.put('data', token);
                respo.addHeader('Content-Type', 'application/json');
                respo.responseBody = Blob.valueOf(JSON.serialize(responseRet));
                respo.statusCode = 201;
            }else if(action == VALIDATE_ADDRESS){
                String address = reqst.params.get('address');
                Http http = new Http();
                HttpRequest req = new HttpRequest();
                String body = '{"address":"'+address+'"}';
                req.setHeader('content-type', 'application/json');
                req.setEndpoint('https://welink-nms.com/api/public/checkServiceAddress');
                req.setBody(body);
                req.setMethod('POST');
                HttpResponse response =  http.send(req);
                String found = ''; Map<String, Object> resp = new Map<String, Object>();
                if(response.getStatusCode()  ==200 || response.getStatusCode()  ==201){
                    resp = 
                        (Map<String, Object>)
                        JSON.deserializeUntyped(response.getBody());
                    found = resp.get('found') == true ? 'true' : 'false' ;
                }
                responseRet.put('data', resp);
                respo.addHeader('Content-Type', 'application/json');
                respo.responseBody = Blob.valueOf(JSON.serialize(responseRet));
                respo.statusCode = 201;
            }else if(action == CREATE_LEAD){
                Lead newlead = new Lead();
                newlead.FirstName = reqst.params.get('FirstName');
                newlead.LastName = reqst.params.get('LastName');
                newlead.Email = reqst.params.get('Email');
                newlead.Phone = reqst.params.get('Phone');
                
                insert newlead;
                responseRet.put('data', newlead);
                responseRet.put('status', 1);
                respo.addHeader('Content-Type', 'application/json');
                respo.responseBody = Blob.valueOf(JSON.serialize(responseRet));
                respo.statusCode = 201;
            }else if(action == CREATE_SUBSCRIPTION){
                Account newAcc = new Account();
                newAcc.Name = reqst.params.get('FirstName')+' '+reqst.params.get('LastName');
                newAcc.Primary_Contact_Email__c = reqst.params.get('Email');
                Id accRecordTypeId = Schema.getGlobalDescribe().get('Account').getDescribe().getRecordTypeInfosByName().get('Residential Customer').getRecordTypeId();
                newAcc.recordTypeId = accRecordTypeId;
                newAcc.Phone = reqst.params.get('Phone');
                insert newAcc;

                Subscription__c newSub = new Subscription__c();
                newSub.Account__c = newAcc.Id;
                insert newSub;
                responseRet.put('data', newSub);
                responseRet.put('status', 1);
                respo.addHeader('Content-Type', 'application/json');
                respo.responseBody = Blob.valueOf(JSON.serialize(responseRet));
                respo.statusCode = 201;
            }else{
                responseRet.put('msg','incorrect action!');
                respo.addHeader('Content-Type', 'application/json');
                respo.responseBody = Blob.valueOf(JSON.serialize(responseRet));
                respo.statusCode = 400;
            }
        }else{
            responseRet.put('msg','incorrect action!');
            respo.addHeader('Content-Type', 'application/json');
            respo.responseBody = Blob.valueOf(JSON.serialize(responseRet));
            respo.statusCode = 400;
        }
    }

    public static String endPoint(String clientId, String clientSecret, String userName, String password){
        String endpoint = 'https://welink1.my.salesforce.com/services/oauth2/token?grant_type=password&client_id={{client_id}}&client_secret={{client_secret}}&username={{username}}&password={{password}}';
        endpoint = endpoint.replace('{{client_id}}', clientId);
        endpoint = endpoint.replace('{{client_secret}}', clientSecret);
        endpoint = endpoint.replace('{{username}}', userName);
        endpoint = endpoint.replace('{{password}}', password); 
        return endPoint;
    }

    public static String getAccessToken(){
        Http http = new Http();
        String accessToken = '';
        HttpRequest req = new HttpRequest();
        req.setHeader('content-type', 'application/x-www-form-urlencoded');
        req.setEndpoint('https://welink1--partial.cs217.force.com/services/oauth2/token');
        req.setBody('grant_type=password&client_id='+client_Id+'&client_secret='+client_secret+'&username='+username1+'&password='+password1+'');
        req.setMethod('POST');
        HttpResponse response =  http.send(req);
        System.debug('*******deserializedRes******	'+response.getBody());
        System.debug('response.getStatusCode() :   '+response.getStatusCode() );
        String stscode = String.valueOf(response.getStatusCode())+ '    '+response.getBody();
        if(response.getStatusCode() == 200 || response.getStatusCode() == 201){
            Map<String,Object> deserializedRes = (Map<String,Object>)Json.deserializeUntyped(response.getBody()); 
            
            accessToken = (String)deserializedRes.get('access_token');
        }else{
            accessToken = stscode;
        }
        return accessToken;
    }
}