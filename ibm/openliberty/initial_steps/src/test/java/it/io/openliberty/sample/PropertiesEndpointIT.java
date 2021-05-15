// tag::copyright[]
/*******************************************************************************
 * Copyright (c) 2018 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - Initial implementation
 *******************************************************************************/
// end::copyright[]
package it.io.openliberty.sample;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.json.JsonObject;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;

import org.apache.cxf.jaxrs.provider.jsrjsonp.JsrJsonpProvider;
import org.junit.jupiter.api.Test;

public class PropertiesEndpointIT {

  @Test
  public void testGetProperties() {

      // system properties
      String port = System.getProperty("http.port");
      String contextRoot = System.getProperty("context.root", "/");
      String url = "http://localhost:" + port + contextRoot;

      // client setup
      Client client = ClientBuilder.newClient();
      client.register(JsrJsonpProvider.class);

      // request
      WebTarget target = client.target(url + "system/properties");
      Response response = target.request().get();

      // response
      assertEquals(200, response.getStatus(), "Incorrect response code from " + url);

      JsonObject obj = response.readEntity(JsonObject.class);

      response.close();
  }

}
