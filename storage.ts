import { 
  type Client, type InsertClient,
  type Project, type InsertProject,
  type Quote, type InsertQuote,
  type Lead, type InsertLead,
  type PortfolioItem, type InsertPortfolioItem
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Client operations
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;

  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByClientId(clientId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Quote operations
  getQuotes(): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: string, quote: Partial<InsertQuote>): Promise<Quote | undefined>;
  deleteQuote(id: string): Promise<boolean>;

  // Lead operations
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;

  // Portfolio operations
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: string): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: string, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined>;
  deletePortfolioItem(id: string): Promise<boolean>;

  // Dashboard stats
  getDashboardStats(): Promise<{
    totalClients: number;
    activeProjects: number;
    sentQuotes: number;
    monthlyRevenue: number;
  }>;
}

export class MemStorage implements IStorage {
  private clients: Map<string, Client> = new Map();
  private projects: Map<string, Project> = new Map();
  private quotes: Map<string, Quote> = new Map();
  private leads: Map<string, Lead> = new Map();
  private portfolioItems: Map<string, PortfolioItem> = new Map();

  constructor() {
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Add sample clients
    const client1 = await this.createClient({
      companyName: "Empresa ABC Lda",
      contactName: "João Silva",
      email: "joao@empresa.co.ao",
      phone: "+244 923 456 789",
      location: "Luanda",
      status: "active"
    });

    const client2 = await this.createClient({
      companyName: "XYZ Corporation",
      contactName: "Maria Santos",
      email: "maria@xyz.ao",
      phone: "+244 912 345 678",
      location: "Benguela",
      status: "pending"
    });

    // Add sample projects
    await this.createProject({
      clientId: client1.id,
      name: "Rebranding Completo",
      description: "Desenvolvimento de nova identidade visual",
      status: "active",
      budget: 45000
    });

    await this.createProject({
      clientId: client2.id,
      name: "Marketing Digital",
      description: "Campanha de marketing nas redes sociais",
      status: "pending",
      budget: 30000
    });

    // Add sample quotes
    await this.createQuote({
      clientId: client1.id,
      services: ["branding", "marketing"],
      baseAmount: 27000,
      urgencyFactor: "1.0",
      totalAmount: 27000,
      status: "sent"
    });

    // Add sample leads
    await this.createLead({
      source: "olx_angola",
      companyName: "Tech Solutions AO",
      contactName: "Carlos Mendes",
      email: "carlos@techsolutions.ao",
      phone: "+244 934 567 890",
      status: "qualified"
    });

    // Add sample portfolio items
    await this.createPortfolioItem({
      title: "Identidade Visual Moderna",
      description: "Branding completo para empresa de tecnologia",
      category: "branding",
      clientId: client1.id,
      featured: true
    });
  }

  // Client operations
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: string): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = randomUUID();
    const client: Client = {
      ...insertClient,
      id,
      createdAt: new Date(),
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: string, clientUpdate: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;

    const updatedClient: Client = { ...client, ...clientUpdate };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async deleteClient(id: string): Promise<boolean> {
    return this.clients.delete(id);
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByClientId(clientId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.clientId === clientId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
      completedAt: null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject: Project = { ...project, ...projectUpdate };
    if (projectUpdate.status === "completed" && !project.completedAt) {
      updatedProject.completedAt = new Date();
    }
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Quote operations
  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = {
      ...insertQuote,
      id,
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async updateQuote(id: string, quoteUpdate: Partial<InsertQuote>): Promise<Quote | undefined> {
    const quote = this.quotes.get(id);
    if (!quote) return undefined;

    const updatedQuote: Quote = { ...quote, ...quoteUpdate };
    this.quotes.set(id, updatedQuote);
    return updatedQuote;
  }

  async deleteQuote(id: string): Promise<boolean> {
    return this.quotes.delete(id);
  }

  // Lead operations
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = {
      ...insertLead,
      id,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async updateLead(id: string, leadUpdate: Partial<InsertLead>): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;

    const updatedLead: Lead = { ...lead, ...leadUpdate };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async deleteLead(id: string): Promise<boolean> {
    return this.leads.delete(id);
  }

  // Portfolio operations
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItem(id: string): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.get(id);
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = randomUUID();
    const item: PortfolioItem = {
      ...insertItem,
      id,
      createdAt: new Date(),
    };
    this.portfolioItems.set(id, item);
    return item;
  }

  async updatePortfolioItem(id: string, itemUpdate: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined> {
    const item = this.portfolioItems.get(id);
    if (!item) return undefined;

    const updatedItem: PortfolioItem = { ...item, ...itemUpdate };
    this.portfolioItems.set(id, updatedItem);
    return updatedItem;
  }

  async deletePortfolioItem(id: string): Promise<boolean> {
    return this.portfolioItems.delete(id);
  }

  // Dashboard stats
  async getDashboardStats() {
    const totalClients = this.clients.size;
    const activeProjects = Array.from(this.projects.values()).filter(p => p.status === "active").length;
    const sentQuotes = Array.from(this.quotes.values()).filter(q => q.status === "sent").length;
    
    // Calculate monthly revenue from completed projects this month
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyRevenue = Array.from(this.projects.values())
      .filter(p => p.completedAt && p.completedAt >= thisMonth && p.budget)
      .reduce((sum, p) => sum + (p.budget || 0), 0);

    return {
      totalClients,
      activeProjects,
      sentQuotes,
      monthlyRevenue,
    };
  }
}

export const storage = new MemStorage();
