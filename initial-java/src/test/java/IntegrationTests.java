
import classes.Application;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = Application.class)
public class IntegrationTests {
    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Autowired
    private FilterChainProxy springSecurityFilterChain;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilter(springSecurityFilterChain).build();
    }

    @Test
    public void testGivenCountiesURI_whenMockMVC_thenVerifyResponseType() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/counties").header("Origin", "http://localhost:8080/"))
                .andDo(print()).andExpect(status().isOk())
                .andReturn();

        Assert.assertEquals("application/json;charset=UTF-8",
                mvcResult.getResponse().getContentType());
    }

    @Test
    public void testServerFieldsPageReturnsFields() throws Exception {
        mockMvc.perform(get("/fields")).andDo(print()).andExpect(status().isOk());
    }

    @Test
    public void testDefaultServerPageReturnsForbidden() throws Exception {
        mockMvc.perform(get("/")).andDo(print()).andExpect(status().isOk());
    }

    @Test
    public void testServerPersonRepositoryReturnsForbidden() throws Exception {
        mockMvc.perform(get("/persons")).andDo(print()).andExpect(status().isOk()) ;
    }

    @Test
    public void shouldCreateEntity() throws Exception {
        MvcResult mvcResult = mockMvc.perform(post("/register").content(
                "{\"username\":\"user1\",\"fullname\":\"userone\",\"email\":" +
                        "\"user1@user.com\",\"hashedPassword\":\"asdasdasdas\"}")
                .contentType("application/json"))
                .andExpect(status().isOk())
                .andReturn();
        assertThat(mvcResult.getResponse().getContentAsString().equals("true"));
    }

    @Test
    public void shouldQueryEntity() throws Exception {
        mockMvc.perform(post("/register").content(
                "{\"username\":\"user1\",\"fullname\":\"userone\",\"email\":" +
                        "\"user1@user.com\",\"hashedPassword\":\"asdasdasdas\"}")
                .contentType("application/json")).andExpect(
                status().isOk());
        mockMvc.perform(
                post("/auth/login")
                        .content("username=user1")
                        .contentType("application/x-www-form-urlencoded"))
                        .andExpect(status().isOk())
                .andExpect(jsonPath("$.loginBoolean").value("true"))
                .andExpect(jsonPath("$.hashedPassword").value("asdasdasdas"));
    }

    @Test
    public void shouldQueryUserData() throws Exception {
        mockMvc.perform(post("/register").content(
                "{\"username\":\"user2\",\"fullname\":\"userone\",\"email\":" +
                        "\"user1@user.com\",\"hashedPassword\":\"asdasdasdas\"}")
                .contentType("application/json")).andDo(print()).andExpect(
                status().isOk());
        mockMvc.perform(get("/userData")
                        .content("username=user2")
                        .contentType("application/x-www-form-urlencoded")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user2"))
                .andExpect(jsonPath("$.email").value("user1@user.com"))
                .andExpect(jsonPath("$.name").value("userone"));
    }

    @Test
    public void testCountyList() throws Exception {
        MvcResult result = mockMvc.perform(get("/counties")).andDo(print()).andExpect(
                status().isOk()).andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertThat(result
                .getResponse()
                .getContentAsString()
                .equals("[\"pärnu\",\"tartu\",\"idaviru\",\"jõgeva\",\"võru\",\"harju\",\"viljandi\"," +
                        "\"põlva\",\"saare\",\"lääneviru\",\"hiiu\",\"valga\",\"lääne\",\"rapla\",\"järva\"]"));
    }
}
