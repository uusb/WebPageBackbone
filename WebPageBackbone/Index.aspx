<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Main.Master" CodeBehind="Index.aspx.cs" Inherits="WebPageBackbone.Index" %>

<asp:Content ContentPlaceHolderID="head" runat="server">
    <%: Scripts.Render("~/Scripts/Experiments.js") %>
</asp:Content>

<asp:Content ContentPlaceHolderID="cphBody" runat="server">
    <div id="search-container"></div>
</asp:Content>